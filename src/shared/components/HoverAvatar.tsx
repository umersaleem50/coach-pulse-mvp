import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { UserProfile } from "@/types/global";
import { generateAvatarURL } from "../lib/helpers";

function HoverAvatar({
  user,
  children,
}: {
  user: UserProfile;
  children: React.ReactNode;
}) {
  const avatar = generateAvatarURL(user.avatar_url);
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent className="flex gap-x-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={avatar}
              width={60}
              className="rounded-full"
              height={60}
            />
            <AvatarFallback>{user.full_name.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <p className="text-sm font-medium">{user.full_name}</p>

            <p className="text-xs text-muted-foreground">
              {user.email.split("@")[0]}
            </p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export default HoverAvatar;
