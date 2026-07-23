import express from "express";
import * as Sentry from "@sentry/node";
import * as db from "../controllers/controllers.gigs.js";
import { requireSession } from "../../middleware/authMiddleware.js";
import { logger } from "../../services/logging.js";

const log = logger.child({ module: "Gigs Routes" });

export const router = express.Router();
