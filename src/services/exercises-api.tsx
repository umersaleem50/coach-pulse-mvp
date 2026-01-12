import { supabase } from "@/shared/lib/supabase";
import type { CombinedExerciseSchema } from "@/validators/exercises.validator";
import type z from "zod";
import { getUser } from "./auth-api";

export async function getExercises() {
  const { data: exercises, error } = await supabase
    .from("exercises")
    .select("*,trainer(full_name,avatar_url,email)");

  if (error) throw error;

  return exercises;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function injectUserInPayload(user_id: string | undefined, payload: any) {
  const isPayloadArray = Array.isArray(payload);

  if (isPayloadArray) {
    return payload.map((exercise) => {
      return { ...exercise, trainer: user_id };
    });
  } else return { ...payload, trainer: user_id };
}

export async function createExerciseAPI(
  payload: z.infer<typeof CombinedExerciseSchema>
) {
  const currentUser = await getUser();
  const modifiedPayload = injectUserInPayload(currentUser?.id, payload);

  const { data, error } = await supabase
    .from("exercises")
    .insert(modifiedPayload)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteUserExerciseAPI(exerciseID: string) {
  const { data, error } = await supabase
    .from("exercises")
    .delete()
    .eq("id", exerciseID);

  if (error) throw error;

  return data;
}
