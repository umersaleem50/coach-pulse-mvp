import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubscription as createSubscriptionApi } from "@/services/subscription-api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";
import { handleOnError } from "@/shared/lib/utils";

export function useCreateSubscription() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: createSubscription, isPending } = useMutation({
    mutationFn: (payload: any) =>
      createSubscriptionApi({ trainer: user?.id, ...payload }),
    onSuccess: () => {
      toast.success("Subscription created!", {
        description: "Your subscription is ready to offer.",
      });
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
    onError: (err) =>
      handleOnError({
        err,
        title: "Something went wrong while creating subscription.",
      }),
  });

  return { createSubscription, isPending };
}
