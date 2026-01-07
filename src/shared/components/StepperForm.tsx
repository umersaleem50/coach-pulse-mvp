import type { MultiFormContextProps } from "@/store/MultiFormContext";
import type { ExerciseFormStep } from "@/types/exercise-form";
import { CombinedExerciseSchema } from "@/validators/exercises.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { Form } from "./ui/form";

export const MultiStepFormContext = createContext<MultiFormContextProps | null>(
  null
);

const MultiStepForm = ({ steps }: { steps: ExerciseFormStep[] }) => {
  const methods = useForm<z.infer<typeof CombinedExerciseSchema>>({
    resolver: zodResolver(CombinedExerciseSchema),
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps[currentStepIndex];

  function handleNext() {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((current) => current + 1);
    }
  }

  function handlePrevious() {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((current) => current - 1);
    }
  }

  function handleGotoStep(position: number) {
    if (position >= 0 && position - 1 < steps.length) {
      setCurrentStepIndex(position - 1);
      methods.saveFormState(position - 1);
    }
  }

  async function handleSubmitSteppedForm(
    data: z.infer<typeof CombinedExerciseSchema>
  ) {
    try {
      console.log("data", data);
    } catch (error) {
      console.error("Form Submition error", error);
    }
  }

  const value: MultiFormContextProps = {
    currentStep: currentStep,
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goToStep: handleGotoStep,
    nextStep: handleNext,
    previousStep: handlePrevious,
    steps: steps,
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      <Form {...methods}>
        <div className="w-[550px] mx-auto">
          {/* <ProgressIndicator /> */}
          <form onSubmit={methods.handleSubmit(handleSubmitSteppedForm)}>
            <h1>{currentStep.title}</h1>
            {currentStep.component}
          </form>
        </div>
      </Form>
    </MultiStepFormContext.Provider>
  );
};
