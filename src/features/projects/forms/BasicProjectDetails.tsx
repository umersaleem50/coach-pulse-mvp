import LocationInput from "@/shared/components/LocationInput";
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
import { useMultiFormContext } from "@/shared/hooks/use-stepped-form";
import type { CombinedProjectType } from "@/validators/project.validator";
import { Controller, useFormContext } from "react-hook-form";
import UpdateProjectImage from "../components/UpdateProjectImage";

function BasicProjectDetails() {
  const form = useFormContext<CombinedProjectType>();

  const { nextStep } = useMultiFormContext();

  function handleSetLocation(location: {
    position: [number, number];
    address: string;
  }) {
    form.setValue("location", location.position);
  }

  async function handleOnSubmit() {
    nextStep();
  }
  return (
    <FieldGroup>
      <FieldSet>
        <Controller
          name="logo"
          control={form.control}
          render={({ fieldState }) => (
            <Field>
              <UpdateProjectImage
                onImageSelect={() => {}}
                avatarUrl={form.getValues("logo")}
                fallBack="AJ"
                isLoading={false}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
          name="location"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="muscles_group">Exercise Type</FieldLabel>
              <LocationInput field={field} onLocation={handleSetLocation} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal" className="flex justify-between w-full">
          <StepperPreviousButton />
          <StepperNextButton onClick={handleOnSubmit} />
        </Field>
      </FieldSet>
    </FieldGroup>
  );
}

export default BasicProjectDetails;
