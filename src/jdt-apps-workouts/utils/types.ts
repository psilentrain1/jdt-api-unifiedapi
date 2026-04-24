export interface Workout {
  id?: number;
  title: string;
  start_time: string;
  end_time: string;
  description?: string;
  exercise_title: string;
  superset_id?: string;
  exercise_notes?: string;
  set_index: number;
  set_type?: string;
  weight_lbs?: number;
  reps?: number;
  distance_miles?: number;
  duration_seconds?: number;
  rpe?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Measurement {
  id?: number;
  date: string;
  weight_lbs?: number;
  fat_percent?: number;
  neck_in?: number;
  shoulder_in?: number;
  chest_in?: number;
  left_bicep_in?: number;
  right_bicep_in?: number;
  left_forearm_in?: number;
  right_forearm_in?: number;
  abdomen_in?: number;
  waist_in?: number;
  hips_in?: number;
  left_thigh_in?: number;
  right_thigh_in?: number;
  left_calf_in?: number;
  right_calf_in?: number;
  modified_at?: string;
  deleted_at?: string;
}

export interface WorkoutSummary {
  title: string;
  date: string;
  duration_minutes: number;
  volume_lbs: number;
  set_count: number;
}

export interface ExerciseDetails {
  title: string;
  notes?: string;
  sets: ExerciseSetDetails[];
}

export interface ExerciseSetDetails {
  set_id: number;
  set_reps?: number;
  set_weight_lbs?: number;
  set_distance_miles?: number;
  set_duration_seconds?: number;
}

export interface NutritionInfo {
  energy_kcal?: number;
  alcohol_g?: number;
  caffeine_mg?: number;
  water_g?: number;
  b1_mg?: number;
  b2_mg?: number;
  b3_mg?: number;
  b5_mg?: number;
  b6_mg?: number;
  b12_mg?: number;
  folate_ug?: number;
  a_ug?: number;
  c_mg?: number;
  d_iu?: number;
  e_mg?: number;
  k_ug?: number;
  calcium_mg?: number;
  copper_mg?: number;
  iron_mg?: number;
  magnesium_mg?: number;
  manganese_mg?: number;
  phosphorus_mg?: number;
  potassium_mg?: number;
  selenium_ug?: number;
  sodium_mg?: number;
  zinc_mg?: number;
  carbs_g?: number;
  fiber_g?: number;
  starch_g?: number;
  sugars_g?: number;
  added_sugars_g?: number;
  net_carbs_g?: number;
  fat_g?: number;
  cholesterol_mg?: number;
  monounsaturated_g?: number;
  polyunsaturated_g?: number;
  saturated_g?: number;
  trans_fats_g?: number;
  omega_3_g?: number;
  omega_6_g?: number;
  cystine_g?: number;
  histidine_g?: number;
  isoleucine_g?: number;
  leucine_g?: number;
  lysine_g?: number;
  methionine_g?: number;
  phenylalanine_g?: number;
  protein_g?: number;
  theronine_g?: number;
  tryptophan_g?: number;
  tyrosene_g?: number;
  valine_g?: number;
}

export interface DailyNutrition extends NutritionInfo {
  id?: number;
  date: string;
  marked_completed: boolean;
  modified_at?: string;
  deleted_at?: string;
}

export interface FoodServing extends NutritionInfo {
  id?: number;
  day: string;
  group: "Uncategorized" | "Breakfast" | "Lunch" | "Dinner" | "Snacks";
  food_name: string;
  amount: string;
  category?: string;
  modified_at?: string;
  deleted_at?: string;
}
