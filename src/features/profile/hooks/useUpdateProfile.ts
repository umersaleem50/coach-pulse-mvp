import { updateAccount } from "@/services/auth-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  function handleSuccess() {
    toast("Profile updated sucessfully!");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }

  function handleError(err: Error) {
    toast.error(err.name, { description: err.message });
  }

  const { mutate: updateProfile, isPending: isLoading } = useMutation({
    mutationFn: updateAccount,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return { updateProfile, isLoading };
}
