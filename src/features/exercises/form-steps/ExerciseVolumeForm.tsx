import InputWithIcon from "@/shared/components/InputWithIcon";
import StepperNextButton from "@/shared/components/StepperNextButton";
import StepperPreviousButton from "@/shared/components/StepperPreviousButton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { useMultiStepForm } from "@/shared/hooks/use-stepped-form";
import type { CombinedExerciseSchema } from "@/validators/exercises.validator";
import { Layers, Pause, Repeat2, Timer } from "lucide-react";
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
      <FieldGroup className="gap-3">
        <Controller
          control={form.control}
          name="sets"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="">Sets</FieldLabel>
              <InputWithIcon
                {...field}
                icon={<Layers size={16} />}
                iconPosition="start"
                type="number"
                min={1}
                onChange={(e) => {
                  return field.onChange(e);
                }}
              />
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
              <InputWithIcon
                icon={<Repeat2 size={16} />}
                iconPosition="start"
                {...field}
                type="number"
                min={1}
              />
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
              <InputWithIcon
                {...field}
                icon={<Pause size={18} />}
                type="number"
                iconPosition="start"
                min={1}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="break_duration"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="break_duration">
                Break Duration:
                <b className="text-primary">{field.value} Seconds</b>
              </FieldLabel>
              <InputWithIcon
                id="break_duration"
                icon={<Timer size={16} />}
                iconPosition="start"
                {...field}
                min={1}
                type="number"
              />
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
