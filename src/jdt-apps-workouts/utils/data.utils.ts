import {
  type Workout,
  Measurement,
  DailyNutrition,
  FoodServing,
} from "./types";

/**
 * Returns a list of workouts that are not already present in the database.
 * @param workouts List of workouts.
 * @param dbWorkouts Workouts in the database.
 * @returns Deduplicated list of workouts.
 */
export function dedupeWorkouts(
  workouts: Workout[],
  dbWorkouts: Workout[],
): Workout[] {
  return workouts.filter((workout) => {
    return !dbWorkouts.some(
      (dbWorkout) =>
        workout.title === dbWorkout.title &&
        workout.start_time === dbWorkout.start_time &&
        workout.exercise_title === dbWorkout.exercise_title &&
        workout.set_index === dbWorkout.set_index,
    );
  });
}

/**
 * Returns a list of measurements that are not already present in the database.
 * @param measurements List of measurements.
 * @param dbMeasurements Measurements in the database.
 * @returns Deduplicated list of measurements.
 */
export function dedupeMeasurements(
  measurements: Measurement[],
  dbMeasurements: Measurement[],
): Measurement[] {
  return measurements.filter((measurement) => {
    return !dbMeasurements.some(
      (dbMeasurement) => measurement.date === dbMeasurement.date,
    );
  });
}

/**
 * Returns a list of daily summaries that are not already present in the database.
 * @param summaries List of summaries.
 * @param dbSummaries Summaries in the database.
 * @returns Deduplicated list of summaries.
 */
export function dedupeSummaries(
  summaries: DailyNutrition[],
  dbSummaries: DailyNutrition[],
): DailyNutrition[] {
  return summaries.filter((summary) => {
    return !dbSummaries.some((dbSummary) => summary.date === dbSummary.date);
  });
}

/**
 * Returns a list of food servings that are not already present in the database.
 * @param food List of food servings.
 * @param dbFood Food servings in the database.
 * @returns Deduplicated list of food servings.
 */
export function dedupeFood(
  food: FoodServing[],
  dbFood: FoodServing[],
): FoodServing[] {
  return food.filter((f) => {
    return !dbFood.some(
      (dbF) =>
        f.day === dbF.day &&
        f.group === dbF.group &&
        f.food_name === dbF.food_name &&
        f.amount === dbF.amount &&
        f.energy_kcal === dbF.energy_kcal,
    );
  });
}
