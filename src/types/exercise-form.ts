import type { CombinedExerciseType } from "@/validators/exercises.validator";

type FieldKeys = keyof CombinedExerciseType;

// export type ExerciseFormStep = {
//   title: string;
//   description: string;
//   position: number;
//   validationSchema: ZodType<unknown>;
//   component: React.ReactNode;
//   icon: LucideIcon;
//   fields: FieldKeys[];
// };
