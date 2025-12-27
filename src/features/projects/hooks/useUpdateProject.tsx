import { updateProjectApi } from "@/services/projects-api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProject() {
  const queryClient = useQueryClient();

  const { mutate: updateProject, isPending: isUpdatingProject } = useMutation({
    mutationFn: updateProjectApi,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  function handleOnSuccess(data: any) {
    queryClient.invalidateQueries({
      queryKey: ["projects"],
    });
    queryClient.invalidateQueries({
      queryKey: ["pinned-projects"],
    });
    return toast.success(`Project:${data.name} updated successfully!`);
  }

  function handleOnError(error: Error) {
    toast.error(error.message);
  }

  return { updateProject, isUpdatingProject };
}
