import { EXERCISE_TYPES } from "@/constants";
import StepperNextButton from "@/shared/components/StepperNextButton";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useMultiStepForm } from "@/shared/hooks/use-stepped-form";
import { CombinedExerciseSchema } from "@/validators/exercises.validator";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import ExerciseTypeSelect from "../form-inputs/ExerciseTypeSelect";

function BasicExerciseDetails() {
  const { register, control } =
    useFormContext<z.infer<typeof CombinedExerciseSchema>>();

  const { nextStep } = useMultiStepForm();

  async function handleOnSubmit() {
    nextStep();
  }
  return (
    <FieldGroup>
      <FieldSet>
        <FieldDescription>
          Please provide the basic information about the exercise.
        </FieldDescription>

        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Enter exercise name, i.e, pushups"
            {...register("name")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="type">Exercise Type</FieldLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ExerciseTypeSelect
                {...field}
                options={EXERCISE_TYPES}
                placeholder="Select a type"
              />
            )}
          />
        </Field>
        <Field orientation="horizontal">
          <StepperNextButton onClick={handleOnSubmit} />
        </Field>
      </FieldSet>
    </FieldGroup>
  );
}

export default BasicExerciseDetails;
