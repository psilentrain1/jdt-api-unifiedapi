import express from "express";
import * as db from "../controllers/workouts";
import * as data from "../utils/data.utils";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send(db.getAllMeasurements());
});

router.get("/get/:id", (req, res) => {
  res.send(db.getOneMeasurement(Number(req.params.id)));
});

router.post("/add", (req, res) => {
  const measurements = req.body;
  const dbMeasurements = db.getAllMeasurements();
  const uniqueMeasurements = data.dedupeMeasurements(
    measurements,
    dbMeasurements,
  );
  if (db.addMeasurements(uniqueMeasurements)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

router.put("/update", (req, res) => {
  const measurement = req.body;
  if (db.updateMeasurement(measurement)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

router.delete("/delete/:id", (req, res) => {
  if (db.deleteMeasurement(Number(req.params.id))) {
    res.status(200);
  } else {
    res.status(400);
  }
});
