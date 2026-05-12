import express from "express";
import * as db from "../controllers/jmdm";
import { logger } from "../../services/logging";

const log = logger.child({ module: "JMDM Routes" });

export const router = express.Router();

router.get("/credits", async (req, res) => {
  log.trace("GET /jmdm/credits");
  res.send(await db.getAllCredits());
});
