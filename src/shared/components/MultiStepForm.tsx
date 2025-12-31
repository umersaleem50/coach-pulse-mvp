import { z } from "zod";
import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type FormStep, type MultiStepFormContextProps } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMultiStepForm } from "../hooks/use-step-form";
import { Button, type ButtonProps } from "./ui/button";

import ProgressIndicator from "./progress-indicator";
import { CombinedCheckoutSchema } from "@/validators/exercises.validator";

export const MultiStepFormContext =
  createContext<MultiStepFormContextProps | null>(null);

const MultiStepForm = ({ steps }: { steps: FormStep[] }) => {
  const methods = useForm<z.infer<typeof CombinedCheckoutSchema>>({
    resolver: zodResolver(CombinedCheckoutSchema),
  });

  // Form state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  // Navigation functions
  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (position: number) => {
    if (position >= 0 && position - 1 < steps.length) {
      setCurrentStepIndex(position - 1);
      saveFormState(position - 1);
    }
  };

  /* Form submission function */
  async function submitSteppedForm(
    data: z.infer<typeof CombinedCheckoutSchema>
  ) {
    try {
      // Perform your form submission logic here
      console.log("data", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }

  // Context value
  const value: MultiStepFormContextProps = {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goToStep,
    nextStep,
    previousStep,
    steps,
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      <FormProvider {...methods}>
        <div className="w-[550px] mx-auto">
          <ProgressIndicator />
          <form onSubmit={methods.handleSubmit(submitSteppedForm)}>
            <h1 className="py-5 text-3xl font-bold">{currentStep.title}</h1>
            {currentStep.component}
            <PrevButton />
          </form>
        </div>
      </FormProvider>
    </MultiStepFormContext.Provider>
  );
};

const PrevButton = () => {
  const { isFirstStep, previousStep } = useMultiStepForm();

  return (
    <Button
      variant="outline"
      type="button"
      className="mt-5"
      onClick={previousStep}
      disabled={isFirstStep}
    >
      Previous
    </Button>
  );
};

const NextButton = ({ onClick, type, ...rest }: ButtonProps) => {
  const { isLastStep } = useMultiStepForm();

  return (
    <Button
      className="text-white bg-black hover:bg-slate-950 transition-colors w-full py-6"
      type={type ?? "button"}
      onClick={onClick}
      {...rest}
    >
      {isLastStep ? "Submit" : "Continue"}
    </Button>
  );
};

export default MultiStepForm;
