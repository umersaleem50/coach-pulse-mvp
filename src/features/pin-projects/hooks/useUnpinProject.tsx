import { unPinProjectAPI } from "@/services/pin-project-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUnPinProject() {
  const queryClient = useQueryClient();

  function handleOnError() {
    toast.error("Failed to un-pin project!");
  }

  function handleOnSuccess() {
    queryClient.invalidateQueries({ queryKey: ["pinned-projects"] });
    toast.success("Project un-pinned successfully!");
  }
  const { mutate: unPinProject, isPending: isLoading } = useMutation({
    mutationFn: unPinProjectAPI,
    onError: handleOnError,
    onSuccess: handleOnSuccess,
  });

  return { unPinProject, isLoading };
}
