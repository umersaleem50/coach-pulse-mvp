import { EXERCISE_TYPES } from "@/constants";
import StepperNextButton from "@/shared/components/StepperNextButton";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useMultiStepForm } from "@/shared/hooks/use-stepped-form";
import { CombinedExerciseSchema } from "@/validators/exercises.validator";
import { useFormContext } from "react-hook-form";
import z from "zod";
import ExerciseTypeSelect from "../form-inputs/ExerciseTypeSelect";

function BasicExerciseDetails() {
  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<z.infer<typeof CombinedExerciseSchema>>;

  const { nextStep } = useMultiStepForm();

  async function handleOnSubmit() {
    nextStep();
  }
  return (
    <FieldSet>
      <FieldLegend>Basic Details</FieldLegend>
      <FieldDescription>
        Please provide the basic information about the exercise.
      </FieldDescription>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Enter exercise name, i.e, pushups"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="type">Exercise Type</FieldLabel>
          <ExerciseTypeSelect
            name="type"
            options={EXERCISE_TYPES}
            placeholder="Select a type"
          />
        </Field>
      </FieldGroup>
      <Field orientation="horizontal">
        <StepperNextButton onClick={handleOnSubmit} />
      </Field>
    </FieldSet>
  );
}

export default BasicExerciseDetails;
