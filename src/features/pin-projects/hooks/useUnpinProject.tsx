import { unPinProjectAPI } from "@/services/pin-project-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function handleOnError() {
  toast.error("Failed to un-pin project!");
}

function handleOnSuccess() {
  toast.success("Project un-pinned successfully!");
}

export function useUnPinProject() {
  const { mutate: unPinProject, isPending: isLoading } = useMutation({
    mutationFn: unPinProjectAPI,
    onError: handleOnError,
    onSuccess: handleOnSuccess,
  });

  return { unPinProject, isLoading };
}
