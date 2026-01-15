import express from "express";
import * as db from "../utils/db.utils";
import * as data from "../utils/data.utils";

export const router = express.Router();

// Workouts
router.get("/workouts", (req, res) => {
  res.send(db.getAllWorkouts());
});

router.get("/workouts/get/:id", (req, res) => {
  res.send(db.getOneWorkout(Number(req.params.id)));
});

router.get("/workouts/titles", (req, res) => {
  res.send(db.getWorkoutNames());
});

router.post("/workouts/data", (req, res) => {
  res.send(db.getWorkoutData(req.body.workout));
});

router.post("/workouts/add", (req, res) => {
  const workouts = req.body;
  const dbWorkouts = db.getAllWorkouts();
  const uniqueWorkouts = data.dedupeWorkouts(workouts, dbWorkouts);
  if (db.addWorkouts(uniqueWorkouts)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

router.put("/workouts/update", (req, res) => {
  const workout = req.body;
  if (db.updateWorkout(workout)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

router.delete("/workouts/delete/:id", (req, res) => {
  if (db.deleteWorkout(Number(req.params.id))) {
    res.status(200);
  } else {
    res.status(400);
  }
});

// Exercises
router.get("/exercises/titles", (req, res) => {
  res.send(db.getExerciseNames());
});

router.post("/exercises/data", (req, res) => {
  res.send(db.getExerciseData(req.body.exercise));
});

// Measurements
router.get("/measurements", (req, res) => {
  res.send(db.getAllMeasurements());
});

router.get("/measurements/get/:id", (req, res) => {
  res.send(db.getOneMeasurement(Number(req.params.id)));
});

router.post("/measurements/add", (req, res) => {
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

router.put("/measurements/update", (req, res) => {
  const measurement = req.body;
  if (db.updateMeasurement(measurement)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

router.delete("/measurements/delete/:id", (req, res) => {
  if (db.deleteMeasurement(Number(req.params.id))) {
    res.status(200);
  } else {
    res.status(400);
  }
});

// Summaries
router.get("/summaries", (req, res) => {
  res.send(db.getAllSummaries());
});

router.get("/summaries/get/:id", (req, res) => {
  res.send(db.getOneSummary(Number(req.params.id)));
});

router.post("/summaries/add", (req, res) => {
  const summaries = req.body;
  const dbSummaries = db.getAllSummaries();
  const uniqueSummaries = data.dedupeSummaries(summaries, dbSummaries);
  if (db.addSummaries(uniqueSummaries)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

// TODO: Add route for update
// router.put("/summaries/update", (req, res) => {})

router.delete("/summaries/delete/:id", (req, res) => {
  if (db.deleteSummary(Number(req.params.id))) {
    res.status(200);
  } else {
    res.status(400);
  }
});

// Food
router.get("/food", (req, res) => {
  res.send(db.getAllFood());
});

router.get("/food/get/:id", (req, res) => {
  res.send(db.getOneFood(Number(req.params.id)));
});

router.post("/food/add", (req, res) => {
  const food = req.body;
  const dbFood = db.getAllFood();
  const uniqueFood = data.dedupeFood(food, dbFood);
  if (db.addFood(uniqueFood)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

// TODO: add route for update
// router.put("/food/update", (req, res) => {})

router.delete("/food/delete/:id", (req, res) => {
  if (db.deleteFood(Number(req.params.id))) {
    res.status(200);
  } else {
    res.status(400);
  }
});
