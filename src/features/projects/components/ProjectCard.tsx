import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardRow,
  CardTitle,
} from "@/shared/components/ui/card";

import { Separator } from "@/shared/components/ui/separator";
import { Ellipsis, MapPin } from "lucide-react";

import GroupAvatars from "@/shared/components/GroupAvatars";
import { useReverseGeo } from "@/shared/hooks/useReverseGeo";
import { generateLogoURL } from "@/shared/lib/helpers";

import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";
import type { GroupedProjectProps } from "@/types/global";
import PinProjectButton from "./PinProjectButton";
import ProjectCardActions from "./ProjectCardActions";

function ProjectCard({ project }: { project: GroupedProjectProps }) {
  const { name, admins, logo, id, owners, staffs, status, location } = project;
  const logoURL = generateLogoURL(logo);

  const {
    address,
    error: geoError,
    loading: isLoadingGeo,
  } = useReverseGeo({
    lat: location[0],
    lng: location[1],
  });

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
                    className={cn(
                      "size-1.5 rounded-full",
                      status === "active" ? "bg-green-500" : "bg-red-400"
                    )}
                    aria-hidden="true"
                  ></span>
                  {status}
                </Badge>
              </div>
            </div>
          </div>
          <ProjectCardActions project={project}>
            <Button variant={"ghost"} size={"icon"}>
              <Ellipsis />
            </Button>
          </ProjectCardActions>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
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
              users={staffs}
              role="staff"
              onInviteMember={() => alert("working")}
            />
          </CardRow>
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
        <div className="flex flex-col md:flex-row justify-between w-full md:items-center">
          <div className="flex items-center gap-x-2">
            <MapPin size={24} />
            {geoError ? <p>Location not found!</p> : null}
            {isLoadingGeo ? (
              <Spinner />
            ) : (
              <p className="text-xs w-full">{address}</p>
            )}
          </div>
          <div className="flex gap-x-4 justify-end md:items-end w-full">
            <Button variant={"default"}>Desk Mode</Button>
            <Button variant={"secondary"}>Open Project</Button>
            <PinProjectButton projectId={id} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
