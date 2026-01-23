import { DAYS_OF_WEEK } from "@/constants";
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
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/shared/components/ui/multiselect";
import { useMultiFormContext } from "@/shared/hooks/use-stepped-form";
import type { CombinedProjectType } from "@/validators/project.validator";
import { Controller, useFormContext } from "react-hook-form";

function OpeningHoursForm() {
  const form = useFormContext<CombinedProjectType>();

  const { nextStep } = useMultiFormContext();

  async function handleOnSubmit() {
    nextStep();
  }
  return (
    <FieldGroup>
      <FieldSet>
        <Controller
          name="day_of_week"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-exercise-name">Open days</FieldLabel>

              <MultiSelect values={field.value} onValuesChange={field.onChange}>
                <MultiSelectTrigger className="w-full">
                  <MultiSelectValue placeholder="Select muscle groups" />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {DAYS_OF_WEEK.map(({ label, value }) => (
                      <MultiSelectItem value={value}>{label}</MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="open_time"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="muscles_group">Opening Time</FieldLabel>
              <Input
                {...field}
                type="time"
                id="time-picker-optional"
                step="1"
                defaultValue="10:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="close_time"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="muscles_group">Closing Time</FieldLabel>
              <Input
                {...field}
                type="time"
                id="time-picker-optional"
                step="1"
                defaultValue="10:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
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

export default OpeningHoursForm;
