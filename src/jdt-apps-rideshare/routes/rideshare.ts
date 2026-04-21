import express from "express";
import * as db from "../controllers/rideshare";

export const router = express.Router();

router.get("/rides", (req, res) => {
  res.send(db.getAllRides());
});

router.get("/rides/get/:id", (req, res) => {
  res.send(db.getOneRide(Number(req.params.id)));
});

router.post("/rides/add", (req, res) => {
  if (db.addRide(req.body)) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error adding ride." });
  }
});

router.put("/rides/update", (req, res) => {
  if (db.updateRide(req.body)) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error updating ride." });
  }
});

router.delete("/rides/delete/:id", (req, res) => {
  if (db.deleteRide(Number(req.params.id))) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({ message: "Error deleting ride." });
  }
});
