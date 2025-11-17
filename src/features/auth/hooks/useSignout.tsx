import { signout as signoutApi } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useSignout() {
  const naviate = useNavigate();
  function handleOnSuccess() {
    toast.success("Account Logout Successfully!");
    naviate("/auth/login", { replace: true });
  }

  function handleOnError(err: Error) {
    toast.error(err?.name, { description: err.message });
  }

  const { mutate: signout, isPending: isSigningOut } = useMutation({
    mutationFn: signoutApi,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  return { signout, isSigningOut };
}
