import StepperNextButton from "@/shared/components/StepperNextButton";
import StepperPreviousButton from "@/shared/components/StepperPreviousButton";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

function ExerciseOtherForm() {
  async function handleOnSubmit() {
    return;
  }

  return (
    <FieldSet>
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
      <Field orientation="horizontal" className="flex justify-between w-full">
        <StepperNextButton onClick={handleOnSubmit} type="submit" />
        <StepperPreviousButton />
      </Field>
    </FieldSet>
  );
}

export default ExerciseOtherForm;
