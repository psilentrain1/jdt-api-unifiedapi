import express from "express";
import * as db from "../controllers/rideshare";

export const router = express.Router();

router.get("/rides", async (req, res) => {
  res.send(await db.getAllRides());
});

// FIXME: ID is no longer a number, but a MongoDB ObjectId
router.get("/rides/get/:id", async (req, res) => {
  res.send(await db.getOneRide(Number(req.params.id)));
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

// FIXME: ID is no longer a number, but a MongoDB ObjectId
router.delete("/rides/delete/:id", async (req, res) => {
  if (await db.deleteRide(Number(req.params.id))) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error deleting ride." });
  }
});
