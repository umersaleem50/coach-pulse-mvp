import { EXERCISE_TYPES, GENDER_TYPES, MUSCLE_GROUPS } from "@/constants";
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
import MultipleSelector from "@/shared/components/ui/multiselect";
import { useMultiStepForm } from "@/shared/hooks/use-stepped-form";
import { CombinedExerciseSchema } from "@/validators/exercises.validator";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import ExerciseTypeSelect from "../form-inputs/ExerciseTypeSelect";

function BasicExerciseDetails() {
  const form = useFormContext<z.infer<typeof CombinedExerciseSchema>>();

  const { nextStep } = useMultiStepForm();

  async function handleOnSubmit() {
    nextStep();
  }
  return (
    <FieldGroup>
      <FieldSet>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-exercise-name">Name</FieldLabel>

              <Input
                {...field}
                id="form-exercise-name"
                aria-invalid={fieldState.invalid}
                placeholder="Push up, Chin ups, or Plank"
                autoComplete="exercise-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="muscles_group"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="muscles_group">Exercise Type</FieldLabel>
              <MultipleSelector
                placeholder={"Select targeted muscles"}
                commandProps={{
                  label: "Select muscles group",
                }}
                {...field}
                defaultOptions={MUSCLE_GROUPS}
                ariaInvalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="type">Exercise Type</FieldLabel>
              <ExerciseTypeSelect
                id="type"
                value={field.value}
                onValueChange={field.onChange}
                options={EXERCISE_TYPES}
                placeholder="Select a type"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="gender_preference"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="gender_preference">Exercise Type</FieldLabel>
              <ExerciseTypeSelect
                id="gender_preference"
                value={field.value}
                onValueChange={field.onChange}
                options={GENDER_TYPES}
                placeholder="Select gender preference"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field orientation="horizontal" className="flex justify-between w-full">
          <StepperNextButton onClick={handleOnSubmit} />
          <StepperPreviousButton />
        </Field>
      </FieldSet>
    </FieldGroup>
  );
}

export default BasicExerciseDetails;
