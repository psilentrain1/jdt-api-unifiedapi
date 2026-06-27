import "./services/instrument";
import express from "express";
import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import { client } from "./services/mongo";
import { logger } from "./services/logging";
import { router as rideshareRoutes } from "./jdt-apps-rideshare/routes/rideshare";
import { router as jmdmRoutes } from "./jmdm-webdev-jmdm-vanilla/routes/jmdm";

const log = logger.child({ module: "Server" });
const app = express();
const PORT = Number(process.env.SERVER_PORT);

app.use(express.json({ limit: "10mb" }));
// FIXME: *:57391 is a temporary origin for Zed server
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://127.0.0.1:57391"],
//   }),
// );

app.use((req, res, next) => {
  if (!dbReady) {
    console.warn(`Request arrived before DB ready: ${req.method} ${req.path}`);
    res.status(503).json({ message: "Service unavailable, DB not ready." });
    return;
  }
  next();
});

app.get("/", (req, res) => {
  log.trace(`GET /`);
  res.status(200).json({ message: "ping" });
});

app.use("/rides", rideshareRoutes);

app.use("/jmdm", jmdmRoutes);

Sentry.setupExpressErrorHandler(app);

let dbReady = false;

client
  .connect()
  .then(() => {
    dbReady = true;
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
      log.trace(`App started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

process.on("SIGTERM", async () => {
  await client.close();
  log.info("SIGTERM, closing MongoDB connection.");
});

process.on("SIGINT", async () => {
  await client.close();
  log.info("SIGINT, closing MongoDB connection.");
});
