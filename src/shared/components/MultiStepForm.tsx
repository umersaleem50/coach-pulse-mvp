import { useCreateExercise } from "@/features/exercises/hooks/useCreateExercise";
import type { MultiFormContextProps } from "@/store/MultiFormContext";
import type { ExerciseFormStep } from "@/types/exercise-form";
import {
  CombinedExerciseSchema,
  type CombinedExerciseType,
} from "@/validators/exercises.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import MultiFormProgressIndicator from "./MultiFormProgressIndicator";
import MultiStepFormHeader from "./MultiStepFormTitle";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Form } from "./ui/form";

type FormValues = z.infer<typeof CombinedExerciseSchema>;

// eslint-disable-next-line react-refresh/only-export-components
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
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const { createExercise, isCreatingExercise } = useCreateExercise();

  const [savedFormState, setSavedFormState] =
    useLocalStorage<null | StoredFormState>({
      key: localStorageKey,
      defaultValue: null,
    });

  const methods = useForm<FormValues>({
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

    if (!isValid) return;

    const currentStepValues = methods.getValues(currentStep.fields);

    const formValues = Object.fromEntries(
      currentStep.fields.map((field, index) => [
        field,
        currentStepValues[index] ?? "",
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

  function handleOnCloseDialog() {
    setIsOpenDialog(false);
  }

  const handleSubmitSteppedForm: SubmitHandler<FormValues> = async (data) => {
    createExercise(data, {
      onSuccess: function () {
        clearFormState();
        handleOnCloseDialog();
      },
    });
  };

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
    isLoading: isCreatingExercise,
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
            totalSteps={3}
            actions={false}
          />
          <Form {...methods}>
            {/* <ProgressIndicator /> */}
            <form onSubmit={methods.handleSubmit(handleSubmitSteppedForm)}>
              {currentStep.component}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepForm;
