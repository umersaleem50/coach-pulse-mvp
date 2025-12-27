import { supabase } from "@/shared/lib/supabase";

export async function getExercises() {
  const { data: exercises, error } = await supabase
    .from("exercises")
    .select("*,trainer(full_name,avatar_url,email)");

  if (error) throw error;

  return exercises;
}
