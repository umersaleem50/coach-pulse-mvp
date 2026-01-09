import MultiStepForm from "@/shared/components/MultiStepForm";
import { Button } from "@/shared/components/ui/button";
import type { ExerciseFormStep } from "@/types/exercise-form";
import {
  exerciseDetailsSchema,
  exerciseOtherDetailsSchema,
  exerciseVolumeSchema,
} from "@/validators/exercises.validator";
import { Dumbbell, FileVideoCamera, Layers } from "lucide-react";
import BasicExerciseDetails from "./form-steps/BasicExerciseDetails";
import ExerciseOtherForm from "./form-steps/ExerciseOtherForm";
import ExerciseVolumeForm from "./form-steps/ExerciseVolumeForm";

// eslint-disable-next-line react-refresh/only-export-components
export const exerciseFormSteps: ExerciseFormStep[] = [
  {
    title: "Basic Details",
    component: <BasicExerciseDetails />,
    position: 1,
    validationSchema: exerciseDetailsSchema,
    fields: ["name", "muscles_group", "gender_preference", "type"],
    icon: Dumbbell,
  },
  {
    title: "Exercise Volume",
    component: <ExerciseVolumeForm />,
    position: 1,
    validationSchema: exerciseVolumeSchema,
    fields: ["sets", "reps", "breaks", "break_duration"],
    icon: Layers,
  },
  {
    title: "Workout Demo",
    component: <ExerciseOtherForm />,
    position: 1,
    validationSchema: exerciseOtherDetailsSchema,
    fields: ["video_platform", "video_url", "coach_type"],
    icon: FileVideoCamera,
  },
];

export default function CreateExerciseForm() {
  return (
    <MultiStepForm steps={exerciseFormSteps} localStorageKey="exercise-form">
      <Button>Create Exercise</Button>
    </MultiStepForm>
  );
}
