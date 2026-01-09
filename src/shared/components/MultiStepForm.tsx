import type { MultiFormContextProps } from "@/store/MultiFormContext";
import type { ExerciseFormStep } from "@/types/exercise-form";
import {
  CombinedExerciseSchema,
  type CombinedExerciseType,
} from "@/validators/exercises.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Form } from "./ui/form";

export const MultiStepFormContext = createContext<MultiFormContextProps | null>(
  null
);

type StoredFormState = {
  currentStepIndex: number;
  formValues: Record<string, unknown>;
};

const MultiStepForm = ({
  steps,
  localStorageKey,
  children,
}: {
  steps: ExerciseFormStep[];
  localStorageKey: string;
  children: React.ReactNode;
}) => {
  const [savedFormState, setSavedFormState] =
    useLocalStorage<null | StoredFormState>({
      key: localStorageKey,
      defaultValue: null,
    });

  const methods = useForm<z.infer<typeof CombinedExerciseSchema>>({
    resolver: zodResolver(CombinedExerciseSchema),
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (savedFormState) {
      setCurrentStepIndex(savedFormState.currentStepIndex);
      methods.reset(savedFormState.formValues);
    }
  }, [methods, savedFormState]);

  function saveFormState(stepIndex: number) {
    setSavedFormState({
      currentStepIndex: stepIndex ?? currentStepIndex,
      formValues: methods.getValues(),
    });
  }

  function clearFormState() {
    methods.reset();
    setCurrentStepIndex(0);
    setSavedFormState(null);
    window.localStorage.removeItem(localStorageKey);
  }

  async function handleNext() {
    const isValid = await methods.trigger(currentStep.fields);

    // if (!isValid) return;

    console.error(isValid, currentStep.fields);
    const currentStepValues = methods.getValues(currentStep.fields);

    console.log(currentStepValues);

    const formValues = Object.fromEntries(
      currentStep.fields.map((field, index) => [
        field,
        currentStepValues[index] || "",
      ])
    );

    if (currentStep.validationSchema) {
      const validateResults =
        currentStep.validationSchema.safeParse(formValues);

      if (!validateResults.success) {
        validateResults.error.issues.map((err) => {
          methods.setError(err.path.join(".") as keyof CombinedExerciseType, {
            message: err.message,
            type: "manual",
          });
        });
        return;
      }
    }

    if (currentStepIndex < steps.length - 1) {
      saveFormState(currentStepIndex + 1);
      setCurrentStepIndex((current) => current + 1);
    }
  }

  function handlePrevious() {
    if (currentStepIndex > 0) {
      saveFormState(currentStepIndex - 1);
      setCurrentStepIndex((current) => current - 1);
    }
  }

  function handleGotoStep(position: number) {
    if (position >= 0 && position - 1 < steps.length) {
      setCurrentStepIndex(position - 1);
      // methods.saveFormState(position - 1);
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
    clearFormState,
    steps: steps,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepForm;
