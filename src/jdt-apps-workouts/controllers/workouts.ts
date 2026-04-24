import { client } from "../../services/mongo";
import type {
  Workout,
  Measurement,
  DailyNutrition,
  FoodServing,
} from "../utils/types";
import type { ObjectId, WithId } from "mongodb";
import { logger } from "../../services/logging";

const log = logger.child({ module: "Workouts Controllers" });

const database = client.db("jdt_apps_workouts");
const workoutColl = database.collection<Workout>("workout");
const measurementColl = database.collection<Measurement>("measurement");
const dailyNutritionColl =
  database.collection<DailyNutrition>("daily_nutrition");
const servingsColl = database.collection<FoodServing>("servings");

/**
 * Gets all workouts from the database.
 * @returns List of workouts.
 */
export async function getAllWorkouts(): Promise<WithId<Workout>[]> {
  log.trace("getAllWorkouts()");
  const findResult = workoutColl.find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Gets all measurements from the database.
 * @returns List of measurements.
 */
export async function getAllMeasurements(): Promise<WithId<Measurement>[]> {
  log.trace("getAllMeasurements()");
  const findResult = measurementColl.find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Gets all daily nutrition from the database.
 * @returns List of nutrition summaries.
 */
export async function getAllSummaries(): Promise<WithId<DailyNutrition>[]> {
  log.trace("getAllSummaries()");
  const findResult = dailyNutritionColl.find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Gets all food servings from the database.
 * @returns List of food servings.
 */
export async function getAllFood(): Promise<WithId<FoodServing>[]> {
  log.trace("getAllFood()");
  const findResult = servingsColl.find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Gets single workout from database.
 * @param id ID of the workout to get.
 * @returns Single workout.
 */
export async function getOneWorkout(
  id: ObjectId,
): Promise<WithId<Workout> | null> {
  log.trace(`getOneWorkout() id: ${id}`);
  const findResult = workoutColl.findOne({ _id: id, deleted_at: null });

  return findResult;
}

/**
 * Gets single measurement from database.
 * @param id ID of the measurement to get.
 * @returns Single measurement.
 */
export async function getOneMeasurement(
  id: ObjectId,
): Promise<WithId<Measurement> | null> {
  log.trace(`getOneMeasurement() id: ${id}`);
  const findResult = measurementColl.findOne({ _id: id, deleted_at: null });

  return findResult;
}

/**
 * Gets single day nutrition summary from the database.
 * @param id ID of the summary to get.
 * @returns Single daily nutrition.
 */
export async function getOneSummary(
  id: ObjectId,
): Promise<WithId<DailyNutrition> | null> {
  log.trace(`getOneSummary() id: ${id}`);
  const findResult = dailyNutritionColl.findOne({ _id: id, deleted_at: null });

  return findResult;
}

/**
 * Gets single food record from the database.
 * @param id ID of the food record to get.
 * @returns Single food record.
 */
export async function getOneFood(
  id: ObjectId,
): Promise<WithId<FoodServing> | null> {
  log.trace(`getOneFood() id: ${id}`);
  const findResult = servingsColl.findOne({ _id: id, deleted_at: null });

  return findResult;
}

/**
 * Adds workout(s) to the database.
 * @param workouts List of workouts.
 * @returns Success boolean.
 */
export function addWorkouts(workouts: Workout[]): boolean {
  // FIXME
  const stmt = db.prepare(
    "INSERT INTO workout VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
  );
  const now = new Date().toISOString();

  try {
    workouts.map((w) => {
      stmt.run(
        w.id,
        w.title,
        w.start_time,
        w.end_time,
        w.description,
        w.exercise_title,
        w.superset_id,
        w.exercise_notes,
        w.set_index,
        w.set_type,
        w.weight_lbs,
        w.reps,
        w.distance_miles,
        w.duration_seconds,
        w.rpe,
        now,
        w.deleted_at,
      );
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Adds measurement(s) to the database.
 * @param measurements List of measurements.
 * @returns Success boolean.
 */
export function addMeasurements(measurements: Measurement[]): boolean {
  const stmt = db.prepare(
    "INSERT INTO measurement VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
  );
  const now = new Date().toISOString();

  try {
    measurements.map((m) => {
      stmt.run(
        m.id,
        m.date,
        m.weight_lbs,
        m.fat_percent,
        m.neck_in,
        m.shoulder_in,
        m.chest_in,
        m.left_bicep_in,
        m.right_bicep_in,
        m.left_forearm_in,
        m.right_forearm_in,
        m.abdomen_in,
        m.waist_in,
        m.hips_in,
        m.left_thigh_in,
        m.right_thigh_in,
        m.left_calf_in,
        m.right_calf_in,
        now,
        m.deleted_at,
      );
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Adds nutrition summaries to the database.
 * @param summaries List of summaries.
 * @returns Success boolean.
 */
export function addSummaries(summaries: DailyNutrition[]): boolean {
  const stmt = db.prepare(
    "INSERT INTO daily_nutrition VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
  );
  const now = new Date().toISOString();

  try {
    summaries.map((s) => {
      stmt.run(
        s.id,
        s.date,
        s.energy_kcal,
        s.alcohol_g,
        s.caffeine_mg,
        s.water_g,
        s.b1_mg,
        s.b2_mg,
        s.b3_mg,
        s.b5_mg,
        s.b6_mg,
        s.b12_mg,
        s.folate_ug,
        s.a_ug,
        s.c_mg,
        s.d_iu,
        s.e_mg,
        s.k_ug,
        s.calcium_mg,
        s.copper_mg,
        s.iron_mg,
        s.magnesium_mg,
        s.manganese_mg,
        s.phosphorus_mg,
        s.potassium_mg,
        s.selenium_ug,
        s.sodium_mg,
        s.zinc_mg,
        s.carbs_g,
        s.fiber_g,
        s.starch_g,
        s.sugars_g,
        s.added_sugars_g,
        s.net_carbs_g,
        s.fat_g,
        s.cholesterol_mg,
        s.monounsaturated_g,
        s.polyunsaturated_g,
        s.saturated_g,
        s.trans_fats_g,
        s.omega_3_g,
        s.omega_6_g,
        s.cystine_g,
        s.histidine_g,
        s.isoleucine_g,
        s.leucine_g,
        s.lysine_g,
        s.methionine_g,
        s.phenylalanine_g,
        s.protein_g,
        s.theronine_g,
        s.tryptophan_g,
        s.tyrosene_g,
        s.valine_g,
        s.marked_completed,
        now,
        s.deleted_at,
      );
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Adds food serving(s) to the database.
 * @param servings List of food servings.
 * @returns Success boolean.
 */
export function addFood(servings: FoodServing[]): boolean {
  const stmt = db.prepare(
    "INSERT INTO servings VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
  );
  const now = new Date().toISOString();

  try {
    servings.map((s) => {
      stmt.run(
        s.id,
        s.day,
        s.group,
        s.food_name,
        s.amount,
        s.energy_kcal,
        s.alcohol_g,
        s.caffeine_mg,
        s.water_g,
        s.b1_mg,
        s.b2_mg,
        s.b3_mg,
        s.b5_mg,
        s.b6_mg,
        s.b12_mg,
        s.folate_ug,
        s.a_ug,
        s.c_mg,
        s.d_iu,
        s.e_mg,
        s.k_ug,
        s.calcium_mg,
        s.copper_mg,
        s.iron_mg,
        s.magnesium_mg,
        s.manganese_mg,
        s.phosphorus_mg,
        s.potassium_mg,
        s.selenium_ug,
        s.sodium_mg,
        s.zinc_mg,
        s.carbs_g,
        s.fiber_g,
        s.starch_g,
        s.sugars_g,
        s.added_sugars_g,
        s.net_carbs_g,
        s.fat_g,
        s.cholesterol_mg,
        s.monounsaturated_g,
        s.polyunsaturated_g,
        s.saturated_g,
        s.trans_fats_g,
        s.omega_3_g,
        s.omega_6_g,
        s.cystine_g,
        s.histidine_g,
        s.isoleucine_g,
        s.leucine_g,
        s.lysine_g,
        s.methionine_g,
        s.phenylalanine_g,
        s.protein_g,
        s.theronine_g,
        s.tryptophan_g,
        s.tyrosene_g,
        s.valine_g,
        s.category,
        now,
        s.deleted_at,
      );
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Updates a single workout.
 * @param workout Workout object.
 * @returns Success boolean.
 */
export function updateWorkout(workout: Workout): boolean {
  const stmt = db.prepare(
    "UPDATE workout SET title = ?, start_time = ?, end_time = ?, description = ?, exercise_title = ?, superset_id = ?, exercise_notes = ?, set_index = ?, set_type = ?, weight_lbs = ?, reps = ?, distance_miles = ?, duration_seconds = ?, rpe = ?, modified_at = ? WHERE id = ?;",
  );
  const now = new Date().toISOString();

  const result = stmt.run(
    workout.title,
    workout.start_time,
    workout.end_time,
    workout.description,
    workout.exercise_title,
    workout.superset_id,
    workout.exercise_notes,
    workout.set_index,
    workout.set_type,
    workout.weight_lbs,
    workout.reps,
    workout.distance_miles,
    workout.duration_seconds,
    workout.rpe,
    now,
    workout.id,
  );

  if (result.changes > 0) {
    return true;
  }

  return false;
}

/**
 * Updates a single measurement.
 * @param measurement Measurement object.
 * @returns Success boolean.
 */
export function updateMeasurement(measurement: Measurement): boolean {
  const stmt = db.prepare(
    "UPDATE measurement SET date = ?, weight_lbs = ?, fat_percent = ?, neck_in = ?, shoulder_in = ?, chest_in = ?, left_bicep_in = ?, right_bicep_in = ?, left_forearm_in = ?, right_forearm_in = ?, abdomen_in = ?, waist_in = ?, hips_in = ?, left_thigh_in = ?, right_thigh_in = ?, left_calf_in = ?, right_calf_in = ?, modified_at = ? WHERE id = ?;",
  );
  const now = new Date().toISOString();

  const result = stmt.run(
    measurement.date,
    measurement.weight_lbs,
    measurement.fat_percent,
    measurement.neck_in,
    measurement.shoulder_in,
    measurement.chest_in,
    measurement.left_bicep_in,
    measurement.right_bicep_in,
    measurement.left_forearm_in,
    measurement.right_forearm_in,
    measurement.abdomen_in,
    measurement.waist_in,
    measurement.hips_in,
    measurement.left_thigh_in,
    measurement.right_thigh_in,
    measurement.left_calf_in,
    measurement.right_calf_in,
    now,
    measurement.id,
  );

  if (result.changes > 0) {
    return true;
  }

  return false;
}

export function updateSummary() {
  // TODO
}

export function updateFood() {
  // TODO
}

/**
 * Sets the specified workout as deleted.
 * @param id ID of the workout to delete.
 * @returns Success boolean.
 */
export async function deleteWorkout(id: ObjectId): Promise<boolean> {
  log.trace(`deleteWorkout() id: ${id}`);
  const now = new Date().toISOString();
  const query = { _id: id };
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await workoutColl.updateOne(query, update, options);
    return result.acknowledged;
  } catch (error) {
    log.info(`deleteWorkout() error: ${error}`);
    return false;
  }
}

/**
 * Sets the specified measurement as deleted.
 * @param id ID of the measurement to delete.
 * @returns Success boolean.
 */
export async function deleteMeasurement(id: ObjectId): Promise<boolean> {
  log.trace(`deleteMeasurement() id: ${id}`);
  const now = new Date().toISOString();
  const query = { _id: id };
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await measurementColl.updateOne(query, update, options);
    return result.acknowledged;
  } catch (error) {
    log.info(`deleteMeasurement() error: ${error}`);
    return false;
  }
}

/**
 * Sets the specified daily nutrition summary as deleted.
 * @param id ID of the summary to delete.
 * @returns Success boolean.
 */
export async function deleteSummary(id: ObjectId): Promise<boolean> {
  log.trace(`deleteSummary() id: ${id}`);
  const now = new Date().toISOString();
  const query = { _id: id };
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await dailyNutritionColl.updateOne(query, update, options);
    return result.acknowledged;
  } catch (error) {
    log.info(`deleteSummary() error: ${error}`);
    return false;
  }
}

/**
 * Sets the specified food serving as deleted.
 * @param id ID of the serving to delete.
 * @returns Success boolean.
 */
export async function deleteFood(id: ObjectId): Promise<boolean> {
  log.trace(`deleteFood() id: ${id}`);
  const now = new Date().toISOString();
  const query = { _id: id };
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await servingsColl.updateOne(query, update, options);
    return result.acknowledged;
  } catch (error) {
    log.info(`deleteFood() error: ${error}`);
    return false;
  }
}

/**
 * Get list of workout names.
 * @returns List of workout names.
 */
export async function getWorkoutNames(): Promise<string[]> {
  log.trace("getWorkoutNames()");
  return workoutColl.distinct("title");
}

/**
 * Get list of exercise names.
 * @returns List of exercise names.
 */
export async function getExerciseNames(): Promise<string[]> {
  log.trace("getExerciseNames()");
  return workoutColl.distinct("exercise_title");
}

/**
 * Get data for a specified workout.
 * @param workoutName Name of the workout.
 * @returns Workout data.
 */
export async function getWorkoutData(
  workoutName: string,
): Promise<WithId<Workout>[]> {
  log.trace(`getWorkoutData() workoutName: ${workoutName}`);
  const findResult = workoutColl.find({ title: workoutName, deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Get data for a specified exercise.
 * @param exerciseName Name of the exercise.
 * @returns Workout data.
 */
export async function getExerciseData(
  exerciseName: string,
): Promise<WithId<Workout>[]> {
  log.trace(`getExerciseData() exerciseName: ${exerciseName}`);
  const findResult = workoutColl.find({
    exercise_title: exerciseName,
    deleted_at: null,
  });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}
