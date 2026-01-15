import express from "express";
import "dotenv/config";
import { logger } from "./services/logging";

const log = logger.child({ module: "Server" });
const app = express();
const PORT = Number(process.env.SERVER_PORT);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  log.trace(`GET /`);
  res.status(200).json({ message: "ping" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  log.trace(`App started on port ${PORT}`);
});
