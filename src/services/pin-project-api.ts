import { supabase } from "@/shared/lib/supabase";

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
    .select("*,project_id(name,id)");

  if (error) throw error;
  return { data, error };
}

export async function unPinProjectAPI({ id }: { id: string }) {
  const { error } = await supabase.from("project_pin").delete().eq("id", id);

  if (error) throw error;

  return null;
}
