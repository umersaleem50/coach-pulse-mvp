import { signinOAuth } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useOAuth() {
  function handleOnError(err: Error) {
    toast.error(err?.name, {
      description: err?.message,
    });
  }

  const { mutate: oAuth, isPending: isLoading } = useMutation({
    mutationFn: signinOAuth,

    onError: handleOnError,
  });

  return { oAuth, isLoading };
}
