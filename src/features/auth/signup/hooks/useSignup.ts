import { signup as signupApi } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useSignup() {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/profile", { replace: true });
  }

  function handleOnSuccess() {
    toast.success("Account created successfully!", {
      description: "Please complete your profile to continue using.",
      action: {
        onClick: handleRedirect,
        label: "Complete Profile",
      },
    });
    handleRedirect();
  }

  function handleError(err: Error) {
    toast.error(err?.name, { description: err.message });
  }

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: handleOnSuccess,
    onError: handleError,
  });

  return { signup, isLoading };
}
