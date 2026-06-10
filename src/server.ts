import "./services/instrument.js";
import express from "express";
import * as Sentry from "@sentry/node";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./services/auth.js";
import cors from "cors";
import "dotenv/config";
import { client } from "./services/mongo.js";
import { logger } from "./services/logging.js";
import { router as rideshareRoutes } from "./jdt-apps-rideshare/routes/rideshare.js";
import { router as jmdmRoutes } from "./jmdm-webdev-jmdm-vanilla/routes/jmdm.js";
import { origins } from "./common/globals.js";
import { getErrorMessage } from "./common/utils.js";

const log = logger.child({ module: "Server" });
const app = express();
const PORT = Number(process.env.SERVER_PORT);

app.use(
  cors({
    origin: origins,
    credentials: true,
  }),
);

app.all("/auth/*splat", toNodeHandler(auth));

app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
  if (!dbReady) {
    console.warn(`Request arrived before DB ready: ${req.method} ${req.path}`);
    Sentry.logger.warn("Request arrived before DB ready.", {
      method: req.method,
      path: req.path,
    });
    res.status(503).json({ message: "Service unavailable, DB not ready." });
    return;
  }
  next();
});

app.get("/", (req, res) => {
  log.trace(`GET /`);
  Sentry.logger.trace("GET /", {
    module: "Server",
  });
  res.status(200).json({ message: "ping" });
});

app.use("/rides", rideshareRoutes);

app.use("/jmdm-v1", jmdmRoutes);

app.use("/jmdm", jmdm26Routes);

Sentry.setupExpressErrorHandler(app);

let dbReady = false;
let server: ReturnType<typeof app.listen>;

async function serverShutdown(signal: string) {
  log.info(`${signal}, shutting down server.`);
  Sentry.logger.info(`${signal}, shutting down server.`, {
    module: "Server",
  });

  server.close(() => {
    log.info("HTTP server closed.");
  });

  try {
    await client.close();
    log.info("MongoDB connection closed.");
    Sentry.logger.info("MongoDB connection closed.", {
      module: "Server",
    });
  } catch (err) {
    log.error(
      `Error closing MongoDB connection. Error: ${getErrorMessage(err)}`,
    );
    Sentry.logger.error(`Error closing MongoDB connection.`, {
      module: "Server",
      error: err,
    });
  }

  process.exit(0);
}

process.on("SIGTERM", () => void serverShutdown("SIGTERM"));
process.on("SIGINT", () => void serverShutdown("SIGINT"));

client
  .connect()
  .then(() => {
    dbReady = true;
    server = app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
      log.trace(`App started on port ${PORT}`);
      Sentry.logger.trace(`App started on port ${PORT}`, {
        module: "Server",
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    Sentry.logger.error("Failed to connect to MongoDB", {
      error: err,
    });
    process.exit(1);
  });
