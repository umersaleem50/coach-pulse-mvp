import type { ProjectUserRoleTypes, UserProfile } from "@/types/global";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PlusCircle, PlusIcon, UserPlus } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { TooltipContent } from "./ui/tooltip";
import HoverAvatar from "./HoverAvatar";
import { generateAvatarURL } from "../lib/helpers";

export default function GroupAvatars({
  users,
  onInviteMember,
  role,
}: {
  users: UserProfile[];
  onInviteMember?: () => void;
  role: ProjectUserRoleTypes;
}) {
  return (
    <div className="flex -space-x-[0.675rem]">
      {users.map((user) => (
        <HoverAvatar user={user} key={user.email}>
          <Avatar key={user.email}>
            <AvatarImage
              className="rounded-full ring-2 ring-background"
              src={generateAvatarURL(user.avatar_url)}
              width={36}
              height={36}
              alt={user.full_name}
            />
            <AvatarFallback>
              {user.full_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </HoverAvatar>
      ))}
      <AddMemberAvatar onClick={onInviteMember} role={role} />
    </div>
  );
}

export function AddMemberAvatar({
  role,
  onClick,
}: {
  role: ProjectUserRoleTypes;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar onClick={onClick}>
          <AvatarFallback>
            <PlusIcon size={16} aria-hidden="true" />
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>
        <p className="capitalize">Invite {role}</p>
      </TooltipContent>
    </Tooltip>
  );
}
