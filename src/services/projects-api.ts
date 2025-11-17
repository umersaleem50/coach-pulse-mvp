import { supabase } from "@/shared/lib/supabase";
import { getUser } from "./auth-api";
import type { ProjectUserRoleTypes } from "@/types/global";
import { groupProjectUsers } from "@/shared/lib/helpers";
import { v4 as uuid } from "uuid";

type Project = {
  name: string;
  location: [number, number];
  logo: File | string;
};

export async function uploadProjectLogo(logoFile: File) {
  if (!logoFile) return null;
  const fileName = `logo-${uuid()}.jpg`;

  const { data, error: storageError } = await supabase.storage
    .from("projects")
    .upload(fileName, logoFile);

  console.log("storage error", storageError);
  if (storageError) throw storageError;

  return data;
}

export const getAllProjects = async () => {
  const { data: projects, error } = await supabase.from("projects").select(`
    id,
    name,
    location,
    status,
    logo,
    users:project_users (
      role,
      user:profiles ( id, full_name, avatar_url,email )
    )
  `);

  const groupedProjects = groupProjectUsers(projects as any[]);

  if (error) throw new Error(error.message);

  return groupedProjects;
};

export async function getProject({ id }: { id: string; projectId?: string }) {
  const query = supabase.from("projects").select("*").eq("id", id);

  const { data: project, error } = await query.single();

  if (error) throw new Error(error.message);

  return project;
}

export async function createProject({ name, location, logo }: Project) {
  try {
    let logoPath;

    if (logo instanceof File) {
      const bucket = await uploadProjectLogo(logo);
      logoPath = bucket?.path;
    } else {
      logoPath = logo;
    }
    const user = await getUser();

    const project = await createProjectAPI({
      name,
      location,
      logo: logoPath as string,
    });
    const ownership = await assignProjectRole({
      role: "owner",
      project_id: project.id,
      user_id: user?.id as string,
    });

    console.log(ownership, project);

    return { project, assign: ownership };
  } catch (error) {
    if (error) throw error;
  }
}

export async function createProjectAPI({ name, location, logo }: Project) {
  const { data: project, error } = await supabase
    .from("projects")
    .insert([{ name, location, logo }])
    .select()
    .single();

  console.log("create-project-api-error", error);

  if (error) throw error;

  return project;
}

export async function assignProjectRole({
  role,
  project_id,
  user_id,
}: {
  role: ProjectUserRoleTypes;
  project_id: string | number;
  user_id: string | number;
}) {
  const { data: ownership, error: ownershipError } = await supabase
    .from("project_users")
    .insert([{ role, project_id, user_id }])
    .select()
    .single();

  if (ownership) throw ownershipError;

  return ownership;
}

export async function deleteProject({ id }: { id: string }) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  console.log("assign error", error);
  if (error) throw error;

  return null;
}

export async function updateProjectApi({
  id,
  payload,
}: {
  id: string;
  payload: any;
}) {
  const { data, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}
