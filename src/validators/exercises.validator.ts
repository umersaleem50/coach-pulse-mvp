import {
  COACH_TYPE_LABEL_MAP,
  GENDER_TYPE_LABLE_MAP,
  MUSCLE_GROUP_LABEL_MAP,
} from "@/constants";
import { z } from "zod";

export const step1Schema = z.object({
  name: z.string().min(3, "Exercise name must be at least 3 characters"),
  type: z.string(),
  muscles_group: z.enum(MUSCLE_GROUP_LABEL_MAP).array(),
  gender_preference: z.enum(GENDER_TYPE_LABLE_MAP),
});
export const step2Schema = z.object({
  reps: z
    .number()
    .min(1, "Reps must be at least 1")
    .max(100, "Reps must be less than 100"),
  sets: z
    .number()
    .min(1, "Sets must be at least 1")
    .max(100, "Sets must be less than 100"),
  breaks: z.number(),
  break_duration: z.number(),
});
export const step3Schema = z.object({
  coach_type: z.enum(COACH_TYPE_LABEL_MAP),
  video_url: z.string(),
  video_platform: z.string(),
});

export const CombinedCheckoutSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);

export type CombinedCheckoutType = z.infer<typeof CombinedCheckoutSchema>;
