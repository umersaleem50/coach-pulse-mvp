import type { ExerciseFormStep } from "@/types/exercise-form";
import {
  exerciseDetailsSchema,
  exerciseOtherDetailsSchema,
  exerciseVolumeSchema,
} from "@/validators/exercises.validator";
import { Dumbbell, FileVideoCamera, Layers } from "lucide-react";

export const exerciseFormSteps: ExerciseFormStep[] = [
  {
    title: "Basic Details",
    component: <></>,
    position: 1,
    validationSchema: exerciseDetailsSchema,
    fields: ["name", "muscles_group", "gender_preference", "type"],
    icon: Dumbbell,
  },
  {
    title: "Exercise Volume",
    component: <></>,
    position: 1,
    validationSchema: exerciseVolumeSchema,
    fields: ["sets", "reps", "breaks", "break_duration"],
    icon: Layers,
  },
  {
    title: "Workout Demo",
    component: <></>,
    position: 1,
    validationSchema: exerciseOtherDetailsSchema,
    fields: ["video_platform", "video_url", "coach_type"],
    icon: FileVideoCamera,
  },
];

export default function ExerciseForm() {
  return null;
}
