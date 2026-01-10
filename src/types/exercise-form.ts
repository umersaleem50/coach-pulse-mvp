import type { CombinedExerciseType } from "@/validators/exercises.validator";
import type { LucideIcon } from "lucide-react";
import type { ZodType } from "zod";

type FieldKeys = keyof CombinedExerciseType;

export type ExerciseFormStep = {
  title: string;
  description: string;
  position: number;
  validationSchema: ZodType<unknown>;
  component: React.ReactNode;
  icon: LucideIcon;
  fields: FieldKeys[];
};
