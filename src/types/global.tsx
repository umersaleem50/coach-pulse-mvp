export type ProjectUserRoleTypes = "admin" | "owner" | "staff";

export interface UserProfile {
  email: string;
  id: string;
  avatar_url: string;
  full_name: string;
  updated_at?: Date;
}
