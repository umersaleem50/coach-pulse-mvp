import { BUCKET_URLS } from "@/constants";
import type { GroupedProjectProps, ProjectUserProps } from "@/types/global";

export function groupProjectUsers(projects: ProjectUserProps[]) {
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
