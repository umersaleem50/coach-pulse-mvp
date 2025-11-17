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

function ProjectCardActions({
  children,
  projectName,
  projectLogo,
  projectId,
}: {
  children: React.ReactNode;
  projectName: string;
  projectLogo: string;
  projectId: string | bigint | number;
}) {
  const { deleteProject, isDeleting } = useDeleteProject();

  function handleDeleteProject() {
    deleteProject({ id: projectId as string });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-x-2">
          <Avatar className="size-6">
            <AvatarImage src={projectLogo || "/no-image.jpg"} />
          </Avatar>
          {projectName}
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

          <DropdownMenuItem>
            <Pen /> Edit Project
          </DropdownMenuItem>

          <DropdownMenuItem>
            <BotOff /> Disable Project
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog
            name={projectName}
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
