import { exerciseFormSteps } from "@/features/exercises/CreateExerciseForm";
import { Check } from "lucide-react";
import { useMultiStepForm } from "../hooks/use-stepped-form";

// progress-indicator.tsx
export default function ProgressIndicator() {
  const { goToStep, currentStepIndex } = useMultiStepForm();

  return (
    <div className="flex items-center w-full justify-center">
      <div className="w-full space-y-3">
        <div className="relative flex justify-between">
          {/* Progress Line */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-primary">
            <div className="h-full" />
          </div>
          {/* Steps */}
          {exerciseFormSteps.map((step) => {
            const isCompleted = currentStepIndex > step.position;
            const isCurrent = currentStepIndex === step.position - 1;

            return (
              <div key={step.position} className="relative z-10">
                <button
                  onClick={() => goToStep(step.position)}
                  className={`flex size-12 items-center justify-center rounded-full border-2 ${
                    isCompleted || isCurrent
                      ? "border-primary bg-background text-primary"
                      : "border-secondary bg-secondary text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
