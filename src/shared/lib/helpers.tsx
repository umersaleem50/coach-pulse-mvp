import { BUCKET_URLS } from "@/constants";
import type { GroupedProjectProps, ProjectUserProps } from "@/types/global";
import { toast } from "sonner";

export function groupProjectUsers(projects: ProjectUserProps[] | null) {
  if (!projects?.length) return [];

  return projects.map((project) => {
    const grouped: GroupedProjectProps = {
      ...project,
      owners: [],
      admins: [],
      staffs: [],
      users: [],
    };

    project.users?.forEach(({ role, user }) => {
      if (role === "owner") grouped?.owners?.push(user);
      else if (role === "admin") grouped?.admins?.push(user);
      else if (role === "staff") grouped?.staffs?.push(user);
    });

    return grouped;
  });
}

export function generateAvatarURL(avatar: string) {
  if (!avatar) return "";

  return `${BUCKET_URLS.avatar}${avatar}`;
}

export function generateLogoURL(logo: string) {
  if (!logo) return "";
  return BUCKET_URLS.projectLogos + logo;
}

export function handleMutationError(
  err: Error,
  errTitle: string = "Error",
  errDescription: string = "Action failed, please try again later!"
) {
  const isDev = import.meta.env.DEV;
  const name = isDev ? err.name : errTitle;
  const description = isDev ? err.message : errDescription;
  toast.error(name, { description });
}
