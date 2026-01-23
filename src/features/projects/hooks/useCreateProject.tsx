import { createProject } from "@/services/projects-api";
import type { CombinedProjectType } from "@/validators/project.validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateProject() {
  const queryClient = useQueryClient();

  function handleOnSuccess(data) {
    console.log("mutation", data);
    toast.success("Project created successfully!");
    return queryClient.invalidateQueries({ queryKey: ["projects"] });
  }

  function handleOnError(err: Error) {
    console.log("create-project-error", err);
    return toast.error(err.name, {
      description: err.message,
    });
  }

  async function handleCreateProject(data: CombinedProjectType) {
    const project = await createProject(data);

    return project;
  }

  const { mutate: create, isPending } = useMutation({
    mutationFn: handleCreateProject,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  return { create, isPending };
}
