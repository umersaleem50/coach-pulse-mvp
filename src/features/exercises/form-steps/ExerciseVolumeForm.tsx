import StepperNextButton from "@/shared/components/StepperNextButton";
import StepperPreviousButton from "@/shared/components/StepperPreviousButton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useMultiStepForm } from "@/shared/hooks/use-stepped-form";
import type { CombinedExerciseSchema } from "@/validators/exercises.validator";
import { Controller, useFormContext } from "react-hook-form";
import type z from "zod";

function ExerciseVolumeForm() {
  const form = useFormContext<z.infer<typeof CombinedExerciseSchema>>();

  const { nextStep } = useMultiStepForm();

  function handleOnSubmit() {
    nextStep();
  }

  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          control={form.control}
          name="sets"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="">Sets</FieldLabel>
              <Input {...field} type="number" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="reps"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="">Reps</FieldLabel>
              <Input {...field} type="number" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="breaks"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="">Breaks</FieldLabel>
              <Input {...field} type="number" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field orientation="horizontal" className="flex justify-between w-full">
        <StepperNextButton onClick={handleOnSubmit} />
        <StepperPreviousButton />
      </Field>
    </FieldSet>
  );
}

export default ExerciseVolumeForm;
