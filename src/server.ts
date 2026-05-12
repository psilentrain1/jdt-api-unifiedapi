import express from "express";
import cors from "cors";
import "dotenv/config";
import { logger } from "./services/logging";
import { router as workoutRoutes } from "./jdt-apps-workouts/routes/workouts";
import { router as exerciseRoutes } from "./jdt-apps-workouts/routes/exercises";
import { router as foodRoutes } from "./jdt-apps-workouts/routes/food";
import { router as measurementRoutes } from "./jdt-apps-workouts/routes/measurements";
import { router as summariesRoutes } from "./jdt-apps-workouts/routes/summaries";
import { router as rideshareRoutes } from "./jdt-apps-rideshare/routes/rideshare";
import { router as jmdmRoutes } from "./jmdm-webdev-jmdm-vanilla/routes/jmdm";

const log = logger.child({ module: "Server" });
const app = express();
const PORT = Number(process.env.SERVER_PORT);

app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  log.trace(`GET /`);
  res.status(200).json({ message: "ping" });
});

/*
app.use("/workouts", workoutRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/food", foodRoutes);
app.use("/measurements", measurementRoutes);
app.use("/summaries", summariesRoutes);
*/
app.use("/rides", rideshareRoutes);

app.use("/jmdm", jmdmRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  log.trace(`App started on port ${PORT}`);
});
