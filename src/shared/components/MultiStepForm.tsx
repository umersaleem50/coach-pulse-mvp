import type { MultiFormContextProps, MultiFormStep } from "@/types";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, type ReactNode, useEffect, useState } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import MultiFormProgressIndicator from "./MultiFormProgressIndicator";
import MultiStepFormHeader from "./MultiStepFormTitle";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type StoredFormState<T extends FieldValues> = {
  currentStepIndex: number;
  formValues: T;
};

type MultiStepFormProps<T extends FieldValues> = {
  steps: MultiFormStep<T>[];
  localStorageKey: string;
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  isLoading?: boolean;
};

export const MultiStepFormContext =
  createContext<MultiFormContextProps<any> | null>(null);

function MultiStepForm<T extends FieldValues>({
  steps,
  localStorageKey,
  children,
  onSubmit,
  isLoading,
}: MultiStepFormProps<T>) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [savedFormState, setSavedFormState] =
    useLocalStorage<StoredFormState<T> | null>({
      key: localStorageKey,
      defaultValue: null,
    });

  const methods = useForm<T>({ mode: "all" });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  // Restore saved form state
  useEffect(() => {
    if (savedFormState) {
      setCurrentStepIndex(savedFormState.currentStepIndex);
      methods.reset(savedFormState.formValues);
    }
  }, [savedFormState, methods]);

  function saveFormState(stepIndex: number) {
    setSavedFormState({
      currentStepIndex: stepIndex,
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
    // Trigger validation for the current step fields
    const isValid = await methods.trigger(currentStep.fields);

    if (!isValid) return;

    const currentStepValues = methods.getValues(currentStep.fields);

    const formValues = Object.fromEntries(
      currentStep.fields.map((field, index) => [
        field,
        currentStepValues[index] ?? "",
      ]),
    );

    if (currentStep.validationSchema) {
      const validateResults =
        currentStep.validationSchema.safeParse(formValues);

      if (!validateResults.success) {
        validateResults.error.issues.map((err) => {
          methods.setError(err.path.join(".") as any, {
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
      setCurrentStepIndex((c) => c - 1);
    }
  }

  function handleGotoStep(position: number) {
    if (position >= 0 && position < steps.length) {
      setCurrentStepIndex(position);
    }
  }

  function handleOnCloseDialog() {
    setIsOpenDialog(false);
  }

  // Generic submit handler for last step
  const handleSubmitSteppedForm: SubmitHandler<T> = async (data) => {
    try {
      await onSubmit(data);
      clearFormState();
      handleOnCloseDialog();
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const value: MultiFormContextProps<T> = {
    currentStep,
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goToStep: handleGotoStep,
    nextStep: handleNext,
    previousStep: handlePrevious,
    clearFormState,
    steps,
    isLoading,
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <MultiStepFormHeader />

          <MultiFormProgressIndicator
            currentStep={currentStepIndex + 1}
            onNext={handleNext}
            onPrevious={handlePrevious}
            totalSteps={steps.length} // dynamic
            actions={false}
          />

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmitSteppedForm)}>
              {currentStep.component}
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </MultiStepFormContext.Provider>
  );
}

export default MultiStepForm;
