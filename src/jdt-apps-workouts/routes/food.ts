import express from "express";
import * as db from "../controllers/workouts";
import * as data from "../utils/data.utils";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send(db.getAllFood());
});

router.get("/get/:id", (req, res) => {
  res.send(db.getOneFood(Number(req.params.id)));
});

router.post("/add", (req, res) => {
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
// router.put("/update", (req, res) => {})

router.delete("/delete/:id", (req, res) => {
  if (db.deleteFood(Number(req.params.id))) {
    res.status(200);
  } else {
    res.status(400);
  }
});
