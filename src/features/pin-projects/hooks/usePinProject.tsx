import { pinProject as pinProjectAPI } from "@/services/pin-project-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function handleOnSuccess() {
  toast.success("Project Pined Successfully!");
}

function handleOnError(error: Error) {
  return toast.error(error.message);
}

export function usePinProject() {
  const { mutate: pinProject, isPending: isPinning } = useMutation({
    mutationFn: pinProjectAPI,
    onError: handleOnError,
    onSuccess: handleOnSuccess,
  });

  return { pinProject, isPinning };
}
