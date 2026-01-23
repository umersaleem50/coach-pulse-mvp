import EmptyProjectCard from "@/features/projects/components/EmptyProjectCard";
import { CreateProject } from "@/features/projects/components/FormCreateProject";
import LoadingProjects from "@/features/projects/components/LoadingProjects";
import NewProjectCard from "@/features/projects/components/NewProjectCard";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { useProjects } from "@/features/projects/hooks/useProjects";
import ErrorCard from "@/shared/components/ErrorCard";
import { Page } from "@/shared/components/page";
import type { Project } from "@/types/project";

function Projects() {
  const { projects, isLoadingProjects, projectsError, refetch } = useProjects();

  return (
    <Page>
      <Page.Header title={"Projects"} actions={<CreateProject />} />

      <Page.Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(26rem,1fr))] gap-4 lg:p-4 md:p-3 p-2">
        {projectsError ? (
          <ErrorCard error={projectsError} onRetry={refetch} />
        ) : null}
        {isLoadingProjects ? <LoadingProjects numOfProjects={3} /> : null}
        {!isLoadingProjects && !projects?.length ? <EmptyProjectCard /> : null}
        {projects?.map((project: Project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
        {projects?.length ? <NewProjectCard /> : null}
      </Page.Container>
    </Page>
  );
}

export default Projects;
