import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubscription as createSubscriptionApi } from "@/services/subscription-api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

export function useCreateSubscription() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: createSubscription, isPending } = useMutation({
    mutationFn: (payload: any) =>
      createSubscriptionApi({ trainer: user?.id, ...payload }),
    onSuccess: () => {
      toast.success("Plan created!", {
        description: "Your workout plan is ready for registering clients",
      });
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
    },
    onError: (err) =>
      toast.error(err.name, {
        description: err.message,
      }),
  });

  return { createSubscription, isPending };
}
