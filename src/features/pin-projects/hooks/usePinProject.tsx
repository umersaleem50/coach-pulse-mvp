import { pinProject as pinProjectAPI } from "@/services/pin-project-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePinProject() {
  const queryClient = useQueryClient();

  function handleOnSuccess() {
    queryClient.invalidateQueries({ queryKey: ["pinned-projects"] });
    toast.success("Project Pined Successfully!");
  }

  function handleOnError(error: Error) {
    return toast.error(error.message);
  }

  const { mutate: pinProject, isPending: isPinning } = useMutation({
    mutationFn: pinProjectAPI,
    onError: handleOnError,
    onSuccess: handleOnSuccess,
  });

  return { pinProject, isPinning };
}
