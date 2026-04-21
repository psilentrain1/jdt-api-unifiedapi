import express from "express";
import * as db from "../controllers/rideshare";
import { ObjectId } from "mongodb";

export const router = express.Router();

router.get("/rides", async (req, res) => {
  res.send(await db.getAllRides());
});

router.get("/rides/get/:id", async (req, res) => {
  res.send(await db.getOneRide(ObjectId.createFromHexString(req.params.id)));
});

router.post("/rides/add", async (req, res) => {
  if (await db.addRide(req.body)) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error adding ride." });
  }
});

router.put("/rides/update", async (req, res) => {
  if (await db.updateRide(req.body)) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error updating ride." });
  }
});

router.delete("/rides/delete/:id", async (req, res) => {
  if (await db.deleteRide(ObjectId.createFromHexString(req.params.id))) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error deleting ride." });
  }
});
