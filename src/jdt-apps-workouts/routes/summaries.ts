import express from "express";
import * as db from "../controllers/workouts";
import * as data from "../utils/data.utils";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send(db.getAllSummaries());
});

router.get("/get/:id", (req, res) => {
  res.send(db.getOneSummary(Number(req.params.id)));
});

router.post("/add", (req, res) => {
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
// router.put("/update", (req, res) => {})

router.delete("/delete/:id", (req, res) => {
  if (db.deleteSummary(Number(req.params.id))) {
    res.status(200);
  } else {
    res.status(400);
  }
});
