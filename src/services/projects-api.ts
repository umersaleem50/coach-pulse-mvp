import { groupProjectUsers } from "@/shared/lib/helpers";
import { supabase } from "@/shared/lib/supabase";
import type { ProjectUserRoleTypes } from "@/types/global";
import type { CombinedProjectType } from "@/validators/project.validator";
import { v4 as uuid } from "uuid";
import { getUser } from "./auth-api";

export async function uploadProjectLogo(logoFile: File) {
  if (!logoFile) return null;
  const fileName = `logo-${uuid()}.jpg`;

  const { data, error: storageError } = await supabase.storage
    .from("projects")
    .upload(fileName, logoFile);

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
    created_at,
    users:project_users (
      role,
      user:profiles( id, full_name, avatar_url,email)
    )
  `);

  const groupedProjects = projects?.length && groupProjectUsers(projects);

  if (error) throw new Error(error.message);

  return groupedProjects;
};

export async function getProject({ id }: { id: string; projectId?: string }) {
  const query = supabase.from("projects").select("*").eq("id", id);

  const { data: project, error } = await query.single();

  if (error) throw new Error(error.message);

  return project;
}

export async function createProject(data: CombinedProjectType) {
  const { name, logo, location, close_time, day_of_week, open_time } = data;

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
      logo: logoPath,
    });
    const ownership = await assignProjectRole({
      role: "owner",
      project_id: project.id,
      user_id: user?.id as string,
    });
    const openHours = await setOpeningHours({
      close_time,
      day_of_week,
      open_time,
      project_id: project.id,
    });
    return { project, assign: ownership, openHours };
  } catch (error) {
    if (error) throw error;
  }
}

export async function setOpeningHours(
  payload: Pick<
    CombinedProjectType,
    "project_id" | "day_of_week" | "close_time" | "open_time"
  >,
) {
  const { data, error } = await supabase
    .from("opening_hours")
    .insert([payload])
    .select();

  if (error) throw error;

  return data;
}

export async function createProjectAPI(payload: CombinedProjectType) {
  const { name, location, logo } = payload;
  const { data: project, error } = await supabase
    .from("projects")
    .insert([{ name, location, logo }])
    .select()
    .single();

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
  try {
    let logoPath;
    const { file: logo } = payload;

    if (logo instanceof File) {
      const bucket = await uploadProjectLogo(logo);

      logoPath = bucket?.path;
    } else {
      logoPath = logo;
    }

    const updatedPayload = { ...payload, logo: logoPath };

    delete updatedPayload.file;

    const { data } = await supabase
      .from("projects")
      .update(updatedPayload)
      .eq("id", id)

      .select()
      .single();

    return data;
  } catch (error) {
    if (error) throw error;
  }
}
