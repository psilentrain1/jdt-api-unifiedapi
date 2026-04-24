import express from "express";
import * as db from "../controllers/rideshare";
import { ObjectId } from "mongodb";
import { logger } from "../../services/logging";

const log = logger.child({ module: "Rideshare Routes" });

export const router = express.Router();

router.get("/", async (req, res) => {
  log.trace("GET /rides");
  res.send(await db.getAllRides());
});

router.get("/get/:id", async (req, res) => {
  log.trace("GET /rides/get/:id");
  res.send(await db.getOneRide(ObjectId.createFromHexString(req.params.id)));
});

router.post("/add", async (req, res) => {
  log.trace("POST /rides/add");
  if (await db.addRide(req.body)) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error adding ride." });
  }
});

router.put("/update", async (req, res) => {
  log.trace("PUT /rides/update");
  if (await db.updateRide(req.body)) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error updating ride." });
  }
});

router.delete("/delete/:id", async (req, res) => {
  log.trace("DELETE /rides/delete/:id");
  if (await db.deleteRide(ObjectId.createFromHexString(req.params.id))) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error deleting ride." });
  }
});
