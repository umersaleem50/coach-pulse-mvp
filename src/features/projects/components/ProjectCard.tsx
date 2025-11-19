import { Avatar, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRow,
  CardTitle,
} from "@/shared/components/ui/card";

import { Separator } from "@/shared/components/ui/separator";
import { Ellipsis, MapPin, Menu } from "lucide-react";

import PinProjectButton from "./PinProjectButton";
import GroupAvatars from "@/shared/components/GroupAvatars";
import type { Project } from "@/types/project";
import { generateLogoURL } from "@/shared/lib/helpers";
import ProjectCardActions from "./ProjectCardActions";

interface IProfile {
  full_name: string;
  email: string;
  avatar_url: string;
}

export interface IProject {
  name: string;
  status?: "active" | "closed";
  owner: IProfile;
}

function ProjectCard({
  name,
  admins,
  logo,
  id,
  created_at,
  owners,
  status,
  staff,
  location,
}: Project) {
  const logoURL = generateLogoURL(logo);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="size-16 overflow-hidden object-center rounded-full">
              <img src={logoURL || "/no-image.jpg"} className="object-cover" />
            </div>
            <div className="flex flex-col gap-y-3">
              <CardTitle>{name}</CardTitle>

              <div>
                <span className="text-sm">Status:</span>{" "}
                <Badge variant={"outline"} className="capitalize">
                  <span
                    className="size-1.5 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  ></span>
                  {status}
                </Badge>
              </div>
            </div>
          </div>
          <ProjectCardActions project={{ name, logo, id, location, status }}>
            <Button variant={"ghost"} size={"icon"}>
              <Ellipsis />
            </Button>
          </ProjectCardActions>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <CardRow label="Owners:">
          <GroupAvatars
            users={owners}
            role="owner"
            onInviteMember={() => alert("working")}
          />
        </CardRow>
        <CardRow label="Team:">
          <GroupAvatars
            users={admins}
            role="admin"
            onInviteMember={() => alert("working")}
          />
        </CardRow>
        <CardRow label="Staff:">
          <GroupAvatars
            users={admins}
            role="staff"
            onInviteMember={() => alert("working")}
          />
        </CardRow>
      </CardContent>
      <Separator />
      <CardFooter>
        <div className="flex justify-between w-full items-center">
          <MapPin className="size-5" />
          <span className="text-sm ml-1">testing</span>
          <div className="flex gap-x-4 justify-end items-end w-full">
            <Button variant={"secondary"}>Open Project</Button>
            <PinProjectButton />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
