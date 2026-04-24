import express from "express";
import * as db from "../controllers/workouts";

export const router = express.Router();

router.get("/titles", (req, res) => {
  res.send(db.getExerciseNames());
});

router.post("/data", (req, res) => {
  res.send(db.getExerciseData(req.body.exercise));
});
