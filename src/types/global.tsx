export type ProjectUserRoleTypes = "admin" | "owner" | "staff";

type ProjectStatus = "active" | "in-active";

export interface UserProfile {
  email: string;
  id: string;
  avatar_url: string;
  full_name: string;
  updated_at?: Date;
}

export interface GroupedProjectProps {
  id: bigint | string | number;
  created_at: string;
  name: string;
  location: [number, number];
  logo: string;
  status: ProjectStatus;
  owners: UserProfile[];
  users: UserProfile[];
  admins: UserProfile[];
  staffs: UserProfile[];
}

export interface ProjectUserProps {
  id: bigint;
  created_at: string;
  name: string;
  location: [number, number];
  logo: string;
  status: ProjectStatus;

  users?: {
    role: string;
    user: UserProfile;
  }[];
}
