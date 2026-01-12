import z from "zod";

const MuscleGroupSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const exerciseDetailsSchema = z.object({
  name: z
    .string()
    .min(3, "Name should've atleast 3 chars")
    .max(300, "Name should've under 300 chars."),
  type: z.string("Please select a type"),
  muscles_group: z
    .array(MuscleGroupSchema)
    .min(1, "Please select at least one muscle group")
    .transform((options) => options.map((option) => option.value)),
  gender_preference: z.string().min(1, "Select gender preference"),
});

export const exerciseVolumeSchema = z.object({
  reps: z
    .string()
    .min(1, "Exercise should've minimum of 1 rep")
    .transform((str) => parseInt(str, 10)),
  sets: z
    .string()
    .min(1, "Exercise should've minimum of 1 set")
    .transform((str) => parseInt(str, 10)),
  breaks: z.string().transform((str) => parseInt(str, 10)),
  break_duration: z.string().transform((str) => parseInt(str, 10)),
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
