import { updateProjectApi } from "@/services/projects-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProject() {
  function handleOnSuccess(data) {
    return toast.success(`Project:${data.name} updated successfully!`);
  }

  function handleOnError(err: Error) {
    return toast.error(err.name, { description: err.message });
  }

  const { mutate, isPending: isUpdatingProject } = useMutation({
    mutationFn: updateProjectApi,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });
}
