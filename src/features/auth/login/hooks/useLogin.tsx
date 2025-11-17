import { login as loginApi } from "@/services/auth-api";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleOnSuccess(data: { user: User }) {
    queryClient.setQueryData(["user"], data?.user);
    toast("Login successful!", {
      description: "You will be redirected to dashboard automatically!",
    });
    navigate("/", { replace: true });
    // setTimeout(() => navigate("/", { replace: true }), 1000);
  }

  function handleError(err: Error) {
    toast.error(err?.name, {
      description: err?.message,
    });
  }

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: handleOnSuccess,
    onError: handleError,
  });

  return { login, isLoading };
}
