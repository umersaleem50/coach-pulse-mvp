import { type ExerciseFormStep } from "@/types/exercise-form";

export interface MultiFormContextProps {
  currentStep: ExerciseFormStep;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  steps: ExerciseFormStep[];
  clearFormState: () => void;
}
