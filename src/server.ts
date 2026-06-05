import express from "express";
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

app.get("/", (req, res) => {
  log.trace(`GET /`);
  res.status(200).json({ message: "ping" });
});

app.use("/rides", rideshareRoutes);

app.use("/jmdm", jmdmRoutes);

client
  .connect()
  .then(() => {
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
