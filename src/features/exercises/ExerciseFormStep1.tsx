import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { FormField } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useMultiStepForm } from "@/shared/hooks/use-step-form";
import { Controller, useFormContext } from "react-hook-form";
import type z from "zod";

const ExerciseFormStep1 = ({ form }) => {
  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<z.infer<typeof SteppedFlowSchema>>();

  const { nextStep } = useMultiStepForm();

  const handleStepSubmit = async () => {
    const { email } = getValues();

    // Simulate check for existing email in the database
    if (email === "test@test.com") {
      setError("email", {
        type: "manual",
        message:
          "Email already exists in the database. Please use a different email.",
      });
      return;
    }

    // move to the next step
    nextStep();
  };

  return (
    <div className="flex flex-col gap-3">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="form-exercise-name">Name</FieldLabel>
              <Input
                {...field}
                id="form-exercise-name"
                aria-invalid={fieldState.invalid}
                placeholder="Exercise name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <NextButton onClick={handleStepSubmit} />
    </div>
  );
};
