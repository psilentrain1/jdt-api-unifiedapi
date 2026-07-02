import express from "express";
import * as Sentry from "@sentry/node";
import * as db from "../controllers/rideshare.js";
import { auth } from "../../services/auth.js";
import { ObjectId } from "mongodb";
import { logger } from "../../services/logging.js";
import { toWebHeaders } from "../../common/utils.js";
import type { Ride } from "../utils/types.js";

const log = logger.child({ module: "Rideshare Routes" });

export const router = express.Router();

router.get("/", async (req, res) => {
  log.trace("GET /rides");
  Sentry.logger.trace("GET /rides", {
    module: "Rideshare Routes",
  });
  const session = await auth.api.getSession({
    headers: toWebHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  res.send(await db.getAllRides());
});

router.get("/get/:id", async (req, res) => {
  log.trace("GET /rides/get/:id");
  Sentry.logger.trace("GET /rides/get/:id", {
    module: "Rideshare Routes",
  });
  const session = await auth.api.getSession({
    headers: toWebHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  res.send(await db.getOneRide(ObjectId.createFromHexString(req.params.id)));
});

router.post("/add", async (req, res) => {
  log.trace("POST /rides/add");
  Sentry.logger.trace("POST /rides/add", {
    module: "Rideshare Routes",
  });
  const session = await auth.api.getSession({
    headers: toWebHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  if (await db.addRide(req.body as Ride)) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error adding ride." });
  }
});

router.put("/update", async (req, res) => {
  log.trace("PUT /rides/update");
  Sentry.logger.trace("PUT /rides/update", {
    module: "Rideshare Routes",
  });
  const session = await auth.api.getSession({
    headers: toWebHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  if (await db.updateRide(req.body as Ride)) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error updating ride." });
  }
});

router.delete("/delete/:id", async (req, res) => {
  log.trace("DELETE /rides/delete/:id");
  Sentry.logger.trace("DELETE /rides/delete/:id", {
    module: "Rideshare Routes",
  });
  const session = await auth.api.getSession({
    headers: toWebHeaders(req.headers),
  });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  if (await db.deleteRide(ObjectId.createFromHexString(req.params.id))) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error deleting ride." });
  }
});
