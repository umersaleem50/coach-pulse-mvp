export const COACH_TYPES = [
  { label: "Personal Trainer", value: "personal_trainer" },
  { label: "Strength & Conditioning Coach", value: "strength_conditioning" },
  { label: "Fitness Coach", value: "fitness_coach" },
  { label: "Bodybuilding Coach", value: "bodybuilding" },
  { label: "Powerlifting Coach", value: "powerlifting" },
  { label: "CrossFit Coach", value: "crossfit" },
  { label: "Olympic Weightlifting Coach", value: "olympic_weightlifting" },
  { label: "Sports Performance Coach", value: "sports_performance" },
  { label: "Athletic Trainer", value: "athletic_trainer" },
  {
    label: "Rehabilitation / Corrective Exercise Coach",
    value: "rehab_corrective",
  },
  { label: "Mobility & Flexibility Coach", value: "mobility_flexibility" },
  { label: "Endurance Coach", value: "endurance" },
  { label: "Nutrition Coach", value: "nutrition" },
  { label: "Lifestyle / Wellness Coach", value: "wellness" },
  { label: "Online Coach", value: "online_coach" },
] as const;

export type CoachType = (typeof COACH_TYPES)[number]["value"];

export const COACH_TYPE_LABEL_MAP: Record<CoachType, string> =
  Object.fromEntries(COACH_TYPES.map((t) => [t.value, t.label])) as Record<
    CoachType,
    string
  >;

export const GENDER_TYPES = [
  { label: "Unisex", value: "unisex" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export type GenderType = (typeof GENDER_TYPES)[number]["value"];

export const GENDER_TYPE_LABLE_MAP: Record<GenderType, string> =
  Object.fromEntries(GENDER_TYPES.map((t) => [t.value, t.label])) as Record<
    GenderType,
    string
  >;

//   MUSCLES

export const MUSCLE_GROUPS = [
  { label: "Chest", value: "chest" },
  { label: "Back", value: "back" },
  { label: "Shoulders", value: "shoulders" },
  { label: "Biceps", value: "biceps" },
  { label: "Triceps", value: "triceps" },
  { label: "Forearms", value: "forearms" },
  { label: "Abs / Core", value: "core" },
  { label: "Glutes", value: "glutes" },
  { label: "Quadriceps", value: "quadriceps" },
  { label: "Hamstrings", value: "hamstrings" },
  { label: "Calves", value: "calves" },
  { label: "Full Body", value: "full_body" },
];

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number]["value"];

export const MUSCLE_GROUP_LABEL_MAP: Record<MuscleGroup, string> =
  Object.fromEntries(MUSCLE_GROUPS.map((m) => [m.value, m.label])) as Record<
    MuscleGroup,
    string
  >;

//  EXERCISE TYPES
export const EXERCISE_TYPES = [
  { label: "Cardio", value: "cardio" },
  { label: "Strength", value: "strength" },
  { label: "Flexibility", value: "flexibility" },
  { label: "Mobility", value: "mobility" },
  { label: "HIIT", value: "hiit" },
  { label: "Endurance", value: "endurance" },
  { label: "Balance", value: "balance" },
];

export type ExerciseType = (typeof EXERCISE_TYPES)[number]["value"];

export const EXERCISE_TYPE_LABELS = Object.fromEntries(
  EXERCISE_TYPES.map((t) => [t.value, t.label])
) as Record<ExerciseType, string>;
