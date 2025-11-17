import { BUCKET_URLS } from "@/lib/constants";
import type { UserProfile } from "@/types/global";
import type { Project } from "@/types/project";

export function groupProjectUsers(projects: any[]) {
  if (!projects?.length) return [];

  return projects.map((project) => {
    const grouped: Project = {
      ...project,
      owners: [],
      admins: [],
      staff: [],
    };

    project.users?.forEach(
      ({ role, user }: { role: string; user: UserProfile }) => {
        if (role === "owner") grouped.owners.push(user);
        else if (role === "admin") grouped.admins.push(user);
        else grouped.staff.push(user);
      }
    );

    return grouped;
  });
}

export function generateAvatarURL(avatar: string) {
  if (!avatar) return "";
  return BUCKET_URLS.avatar + avatar;
}

export function generateLogoURL(logo: string) {
  if (!logo) return "";
  return BUCKET_URLS.projectLogos + logo;
}
