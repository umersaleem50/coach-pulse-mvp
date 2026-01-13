import z from "zod";

const MuscleGroupSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const exerciseDetailsSchema = z.object({
  name: z
    .string()
    .min(3, "Name should've atleast 3 chars")
    .max(300, "Name should've under 100 chars.")
    .default(""),
  type: z.string("Please select a type").default("").optional(),
  muscles_group: z
    .array(MuscleGroupSchema)
    .min(1, "Please select at least one muscle group")
    .transform((options) => options.map((option) => option.value))
    .default([]),
  gender_preference: z
    .string()
    .min(1, "Select gender preference")
    .default("unisex"),
});

export const exerciseVolumeSchema = z.object({
  reps: z
    .string()
    .min(1, "Exercise should've minimum of 1 rep")
    .transform((str) => parseInt(str, 10))
    .default(1),
  sets: z
    .string()
    .min(1, "Exercise should've minimum of 1 set")
    .transform((str) => parseInt(str, 10))
    .default(1),
  breaks: z
    .string()
    .transform((str) => parseInt(str, 10))
    .default(1),
  break_duration: z
    .string()
    .transform((str) => parseInt(str, 10))
    .default(1),
});

export const exerciseOtherDetailsSchema = z.object({
  video_platform: z
    .string()
    .min(3, "Please select your video platform")
    .default(""),
  video_url: z.url().min(2, "Please provide a valid url.").default(""),
  coach_type: z.string().optional(),
});

export const CombinedExerciseSchema = exerciseDetailsSchema
  .merge(exerciseVolumeSchema)
  .merge(exerciseOtherDetailsSchema);

export type CombinedExerciseType = z.infer<typeof CombinedExerciseSchema>;
