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

function ExerciseVolumeForm() {
  const { nextStep } = useMultiStepForm();

  function handleOnSubmit() {
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
          <Input name="name" />
        </Field>
      </FieldGroup>
      <Field orientation="horizontal">
        <StepperNextButton onClick={handleOnSubmit} />
      </Field>
    </FieldSet>
  );
}

export default ExerciseVolumeForm;
