import type { UserProfile } from "./global";

export interface Project {
  id: string | number;
  name: string;
  logo: string;
  owners: UserProfile[];
  admins: UserProfile[];
  staff: UserProfile[];
  created_at: Date;
  status: "active" | "disabled";
  location: [number, number];
}
