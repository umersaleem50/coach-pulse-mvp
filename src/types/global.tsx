export type ProjectUserRoleTypes = "admin" | "owner" | "staff";

export interface UserProfile {
  email: string;
  id: string;
  avatar_url: string;
  full_name: string;
  updated_at?: Date;
}

export interface ProjectProps {
  id: bigint;
  created_at: string;
  name: string;
  location: [number, number];
  logo: string;
  status: string;
  owners?: UserProfile[];
  users?: UserProfile[];
  admins?: UserProfile[];
}
