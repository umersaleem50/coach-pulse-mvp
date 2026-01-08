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

function ExerciseOtherForm() {
  async function handleOnSubmit() {
    return;
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
      </FieldGroup>
      <Field orientation="horizontal">
        <StepperNextButton onClick={handleOnSubmit} type="submit" />
      </Field>
    </FieldSet>
  );
}

export default ExerciseOtherForm;
