import { supabase } from "@/shared/lib/supabase";
import { getUser } from "./auth-api";

export async function pinProject({ project_id }: { project_id: string }) {
  const { data, error } = await supabase
    .from("project_pin")
    .insert([{ project_id }])
    .select();

  if (error) throw error;

  return data;
}

export async function getPinnedProjects() {
  const { data, error } = await supabase
    .from("project_pin")
    .select("*,project:project_id(name,id,logo)");

  if (error) throw error;
  return data;
}

export async function unPinProjectAPI({ id }: { id: string }) {
  const user = await getUser();
  const { error } = await supabase
    .from("project_pin")
    .delete()
    .eq("project_id", id)
    .eq("user_id", user?.id);

  if (error) throw error;

  return null;
}
