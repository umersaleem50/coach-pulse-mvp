import { getAllProjects } from "@/services/projects-api";
import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: projectsError,
    refetch,
  } = useQuery({
    queryFn: getAllProjects,
    queryKey: ["projects"],
  });

  return { projects, isLoadingProjects, projectsError, refetch };
}
