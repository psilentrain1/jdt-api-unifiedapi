import express from "express";
import * as db from "../controllers/jmdm.js";
import { logger } from "../../services/logging.js";

const log = logger.child({ module: "JMDM Routes" });

export const router = express.Router();

router.get("/credits", async (req, res) => {
  log.trace("GET /jmdm/credits");
  res.send(await db.getAllCredits());
});
