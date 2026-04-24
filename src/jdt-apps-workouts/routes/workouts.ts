import express from "express";
import * as db from "../controllers/workouts";
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
