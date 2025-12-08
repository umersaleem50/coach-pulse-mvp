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
import { BotOff, Folder, Pen, Trash, Users, UserStar } from "lucide-react";
import useDeleteProject from "../hooks/useDeleteProject";
import PinProject from "./PinProject";
import { Link } from "react-router";

import CreateProjectDialog from "./CreateProjectDialog";

import { generateLogoURL } from "@/shared/lib/helpers";
import type { Project } from "@/types/project";

function ProjectCardActions({
  children,
  project,
}: {
  children: React.ReactNode;
  project: Project;
}) {
  const { deleteProject, isDeleting } = useDeleteProject();
  const { name, logo, id } = project;
  const logoURL = generateLogoURL(logo);

  function handleDeleteProject() {
    deleteProject({ id: id as string });
  }

  return (
    <DropdownMenu>
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

          <CreateProjectDialog project={project}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Pen /> Edit Project
            </DropdownMenuItem>
          </CreateProjectDialog>

          <DropdownMenuItem>
            <BotOff /> Disable Project
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
