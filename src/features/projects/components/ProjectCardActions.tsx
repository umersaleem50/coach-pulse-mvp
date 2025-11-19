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
import { BotOff, Pen, Trash, Users, UserStar } from "lucide-react";
import useDeleteProject from "../hooks/useDeleteProject";
import type z from "zod";
import type { projectFormSchema } from "./FormCreateProject";
import EditProjectCard from "./EditProject";
import { generateLogoURL } from "@/shared/lib/helpers";

function ProjectCardActions({
  children,
  project,
}: {
  children: React.ReactNode;
  project: z.infer<typeof projectFormSchema>;
}) {
  const { deleteProject, isDeleting } = useDeleteProject();

  const logoURL = generateLogoURL(project.logo);

  function handleDeleteProject() {
    deleteProject({ id: project.id as string });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-x-2">
          <Avatar className="size-6">
            <AvatarImage src={logoURL || "/no-image.jpg"} />
          </Avatar>
          {project.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserStar />
            Transfer Ownership
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users />
            Manage Team
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <EditProjectCard data={project}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Pen /> Edit Project
            </DropdownMenuItem>
          </EditProjectCard>

          <DropdownMenuItem>
            <BotOff /> Disable Project
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog
            name={project.name}
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
