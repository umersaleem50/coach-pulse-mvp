import { deleteProject as deleteProjectAPI } from "@/services/projects-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteProject() {
  const queryClient = useQueryClient();

  async function handleOnSuccess(data) {
    toast.success(`Project deleted successfully!`);
    return queryClient.invalidateQueries({ queryKey: ["projects"] });
  }
  function handleOnError(err: Error) {
    return toast.error(err.name, { description: err.message });
  }

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: deleteProjectAPI,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });
  return { deleteProject, isDeleting };
}
