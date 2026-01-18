import MultiStepForm from "@/shared/components/MultiStepForm";
import { Button } from "@/shared/components/ui/button";
import type { MultiFormStep } from "@/types";
import {
  exerciseDetailsSchema,
  exerciseOtherDetailsSchema,
  exerciseVolumeSchema,
  type CombinedExerciseType,
} from "@/validators/exercises.validator";
import { Dumbbell, FileVideoCamera, Layers } from "lucide-react";
import BasicExerciseDetails from "./form-steps/BasicExerciseDetails";
import ExerciseOtherForm from "./form-steps/ExerciseOtherForm";
import ExerciseVolumeForm from "./form-steps/ExerciseVolumeForm";
import { useCreateExercise } from "./hooks/useCreateExercise";

// eslint-disable-next-line react-refresh/only-export-components
export const exerciseFormSteps: MultiFormStep<CombinedExerciseType>[] = [
  {
    title: "Basic Details",
    description: "Please provide basic details about your exercise.",
    component: <BasicExerciseDetails />,
    position: 1,
    validationSchema: exerciseDetailsSchema,
    fields: ["name", "muscles_group", "gender_preference", "type"],
    icon: Dumbbell,
  },
  {
    title: "Exercise Volume",
    description: "Please provide volume for your exercise",
    component: <ExerciseVolumeForm />,
    position: 1,
    validationSchema: exerciseVolumeSchema,
    fields: ["sets", "reps", "breaks", "break_duration"],
    icon: Layers,
  },
  {
    title: "Workout Demo",
    description: "Please demo video to help your clients with workout.",
    component: <ExerciseOtherForm />,
    position: 1,
    validationSchema: exerciseOtherDetailsSchema,
    fields: ["video_platform", "video_url", "coach_type"],
    icon: FileVideoCamera,
  },
];

export default function CreateExerciseForm() {
  const { createExercise, isCreatingExercise } = useCreateExercise();
  function handleOnSubmit(data: CombinedExerciseType) {
    createExercise(data);
  }

  return (
    <MultiStepForm<CombinedExerciseType>
      onSubmit={handleOnSubmit}
      steps={exerciseFormSteps}
      localStorageKey="exercise-form"
      isLoading={isCreatingExercise}
    >
      <Button>Create Exercise</Button>
    </MultiStepForm>
  );
}
