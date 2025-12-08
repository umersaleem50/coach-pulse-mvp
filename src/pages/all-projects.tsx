import { Plus } from "lucide-react";
import type { Project } from "@/types/project";
import EmptyProjectCard from "@/features/projects/components/EmptyProjectCard";
import LoadingProjects from "@/features/projects/components/LoadingProjects";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { useProjects } from "@/features/projects/hooks/useProjects";
import ErrorCard from "@/shared/components/ErrorCard";
import NewProjectCard from "@/features/projects/components/NewProjectCard";
import { Button } from "@/shared/components/ui/button";
import { Page } from "@/shared/components/page";
import NewProjectDialog from "@/features/projects/components/NewProjectDialog";

function AllProjectsPage() {
  const { projects, isLoadingProjects, projectsError, refetch } = useProjects();

  return (
    <Page
      title={"Projects"}
      actions={
        <NewProjectDialog>
          <Button>
            <Plus />
            Create Project
          </Button>
        </NewProjectDialog>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:p-4">
        {projectsError ? (
          <ErrorCard error={projectsError} onRetry={refetch} />
        ) : null}
        {isLoadingProjects ? <LoadingProjects numOfProjects={3} /> : null}
        {!isLoadingProjects && !projects?.length ? <EmptyProjectCard /> : null}
        {projects?.map((project: Project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
        {projects?.length ? <NewProjectCard /> : null}
      </div>
    </Page>
  );
}

export default AllProjectsPage;
