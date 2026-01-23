import AlertDialog from "@/shared/components/AlertDialog";
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Folder,
  Pen,
  ShieldCheckIcon,
  ShieldCloseIcon,
  Trash,
  Users,
  UserStar,
} from "lucide-react";
import { Link } from "react-router";
import useDeleteProject from "../hooks/useDeleteProject";
import PinProject from "./PinProject";

import { generateLogoURL } from "@/shared/lib/helpers";

import { Button } from "@/shared/components/ui/button";
import type { GroupedProjectProps } from "@/types/global";
import { useState } from "react";
import useUpdateProject from "../hooks/useUpdateProject";
import { CreateProject } from "./FormCreateProject";

function ProjectCardActions({
  children,
  project,
}: {
  children: React.ReactNode;
  project: GroupedProjectProps;
}) {
  const { name, logo, id, status, location } = project;
  const { deleteProject, isDeleting } = useDeleteProject();
  const { updateProject, isUpdatingProject } = useUpdateProject();
  const [isOpen, setOpen] = useState(false);

  const logoURL = generateLogoURL(logo);

  function handleCloseMenu() {
    setOpen(false);
  }

  function handleDeleteProject() {
    deleteProject({ id: id as string }, { onSettled: handleCloseMenu });
  }

  function handleProjectStatus() {
    if (status === "active") {
      updateProject(
        { id: id as string, payload: { status: "disabled" } },
        { onSettled: handleCloseMenu },
      );
    } else {
      updateProject(
        { id: id as string, payload: { status: "active" } },
        { onSettled: handleCloseMenu },
      );
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-x-2">
          <Avatar className="size-6">
            <AvatarImage src={logoURL || "/no-image.jpg"} />
          </Avatar>
          {name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={`/projects/${id}`}>
              <Folder />
              Open Project
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserStar />
            Transfer Ownership
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users />
            Manage Team
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <PinProject projectId={id as string}></PinProject>
          </DropdownMenuItem>

          <CreateProject
          // project={{ name, location, logo, status, id: id as string }}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Pen /> Edit Project
            </DropdownMenuItem>
          </CreateProject>

          <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
            <Button
              isLoading={isUpdatingProject}
              onClick={handleProjectStatus}
              variant={"ghost"}
              size={"sm"}
              className="w-full justify-start"
            >
              {!isUpdatingProject ? (
                status === "active" ? (
                  <ShieldCloseIcon />
                ) : (
                  <ShieldCheckIcon />
                )
              ) : null}
              {status === "active" ? "Disable" : "Activate"} Project
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog
            name={name}
            project={"project"}
            onConfirm={handleDeleteProject}
            isLoading={isDeleting}
          >
            <DropdownMenuItem
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash /> Delete Project
            </DropdownMenuItem>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProjectCardActions;
