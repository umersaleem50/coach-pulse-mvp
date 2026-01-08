import { BUCKET_URLS } from "@/constants";
import type { ProjectProps, UserProfile } from "@/types/global";

export function groupProjectUsers(projects: ProjectProps[]) {
  if (!projects?.length) return [];

  return projects.map((project) => {
    const grouped: ProjectProps = {
      ...project,
      owners: [],
      admins: [],
      staffs: [],
    };

    project.users?.forEach(
      ({ role, user }: { role: string; user: UserProfile }) => {
        if (role === "owner") grouped?.owners?.push(user);
        else if (role === "admin") grouped?.admins?.push(user);
        else grouped?.staffs?.push(user);
      }
    );

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
