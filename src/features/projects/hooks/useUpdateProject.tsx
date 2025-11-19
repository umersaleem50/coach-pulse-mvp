import { updateProjectApi } from "@/services/projects-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useEditProject(id: string | number | undefined) {
  const queryClient = useQueryClient();
  function handleOnSuccess() {
    toast.success(`Project:${id} updated successfully!`);
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  }

  function handleOnError(error: Error) {
    toast.error(error.message);
  }

  const { mutate: updateProject, isPending: isUpdatingProject } = useMutation({
    mutationFn: (payload) => updateProjectApi({ id, payload }),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });
  return { updateProject, isUpdatingProject };
}
