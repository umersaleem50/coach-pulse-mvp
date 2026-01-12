import InfoToolTip from "@/shared/components/InfoToolTip";
import InputWithIcon from "@/shared/components/InputWithIcon";
import StepperNextButton from "@/shared/components/StepperNextButton";
import StepperPreviousButton from "@/shared/components/StepperPreviousButton";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { COACH_TYPES, EXERCISE_DEMO_PLATFORMS } from "@/types";
import { CombinedExerciseSchema } from "@/validators/exercises.validator";
import { Earth } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import {
  default as SelectWithOptions,
  default as SelectWithOptionsProps,
} from "../../../shared/components/SelectWithOptions.";

function ExerciseOtherForm() {
  const form = useFormContext<z.infer<typeof CombinedExerciseSchema>>();

  async function handleOnSubmit() {
    return;
  }

  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          control={form.control}
          name="video_platform"
          render={({ field, fieldState }) => {
            return (
              <Field>
                <FieldLabel htmlFor="video_platform">Video Platform</FieldLabel>
                <SelectWithOptionsProps
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                  options={EXERCISE_DEMO_PLATFORMS}
                  id="video_platform"
                  placeholder="Select a platform"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
        <Controller
          control={form.control}
          name="video_url"
          render={({ field, fieldState }) => {
            return (
              <Field>
                <FieldLabel htmlFor="video_platform">
                  Video URL{" "}
                  <InfoToolTip
                    content={
                      <p>Make sure to provide embeded url for demo video</p>
                    }
                  />
                </FieldLabel>
                <InputWithIcon
                  icon={<Earth size={16} />}
                  iconPosition="start"
                  {...field}
                  id="video_platform"
                  placeholder="https://"
                />
                <FieldDescription>
                  Make sure to provide shared or embeded url
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
        <Controller
          control={form.control}
          name="coach_type"
          render={({ field, fieldState }) => {
            return (
              <Field>
                <FieldLabel htmlFor="coach_type">
                  Coach Type
                  <InfoToolTip
                    content={
                      <p>
                        This will help coach of give type to find this exercise.
                      </p>
                    }
                  />
                </FieldLabel>
                <SelectWithOptions
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                  options={COACH_TYPES}
                  id="coach_type"
                  placeholder="Select Coach"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Make sure to provide shared or embeded url
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <Field orientation="horizontal" className="flex justify-between w-full">
        <StepperNextButton onClick={handleOnSubmit} type="submit" />
        <StepperPreviousButton />
      </Field>
    </FieldSet>
  );
}

export default ExerciseOtherForm;
