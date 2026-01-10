import z from "zod";

export const exerciseDetailsSchema = z.object({
  name: z
    .string()
    .min(3, "Name should've atleast 3 chars")
    .max(300, "Name should've under 300 chars."),
  type: z.string("Please select a type"),
  muscles_group: z
    .object({ value: z.string(), label: z.string() })
    .array()
    .min(1, "Select at-least one mucsle"),
  gender_preference: z.string().min(1, "Select gender preference"),
});

export const exerciseVolumeSchema = z.object({
  reps: z.number().min(1, "Exercise should've minimum of 1 rep"),
  sets: z.number().min(1, "Exercise should've minimum of 1 set"),
  breaks: z.number(),
  break_duration: z.number(),
});

export const exerciseOtherDetailsSchema = z.object({
  video_platform: z.string(),
  video_url: z.string(),
  coach_type: z.string().optional(),
});

export const CombinedExerciseSchema = exerciseDetailsSchema
  .merge(exerciseVolumeSchema)
  .merge(exerciseOtherDetailsSchema);

export type CombinedExerciseType = z.infer<typeof CombinedExerciseSchema>;
