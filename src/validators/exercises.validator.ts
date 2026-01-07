import z from "zod";

export const exerciseDetailsSchema = z.object({
  name: z
    .string()
    .min(3, "Enter exercise name")
    .max(300, "Please keep name under 300 characters."),
  type: z.string(),
  muscles_group: z.string().array(),
  gender_preference: z.string(),
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
