import { useMutation } from "@tanstack/react-query";
import { passwordRecovery as passwordRecoveryApi } from "@/services/auth-api";
import { toast } from "sonner";

export function usePassworRecovery() {
  function handleSuccess() {
    toast.success("Recovery mail sent!", {
      description: "Please check your mail for a recovery mail.",
    });
  }

  function handleError(err: Error) {
    toast.error(err.name, {
      description: err.message,
    });
  }

  const { mutate: passwordRecovery, isPending: isLoading } = useMutation({
    mutationFn: passwordRecoveryApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });
  return { passwordRecovery, isLoading };
}
