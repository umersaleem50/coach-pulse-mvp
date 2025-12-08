import { updateProjectApi } from "@/services/projects-api";
<<<<<<< HEAD
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useEditProject(id: string | number | undefined) {
  const queryClient = useQueryClient();
  function handleOnSuccess() {
    toast.success(`Project:${id} updated successfully!`);
    queryClient.invalidateQueries({ queryKey: ["projects"] });
=======
import type { Project } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProject({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { mutate: updateProject, isPending: isUpdatingProject } = useMutation({
    mutationFn: (payload) => {
      return updateProjectApi({ id, payload });
    },
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  function handleOnSuccess(data: any) {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    return toast.success(`Project:${data.name} updated successfully!`);
>>>>>>> 820b6ea (completed)
  }

  function handleOnError(error: Error) {
    toast.error(error.message);
  }

<<<<<<< HEAD
  const { mutate: updateProject, isPending: isUpdatingProject } = useMutation({
    mutationFn: (payload) => updateProjectApi({ id, payload }),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });
=======
>>>>>>> 820b6ea (completed)
  return { updateProject, isUpdatingProject };
}
