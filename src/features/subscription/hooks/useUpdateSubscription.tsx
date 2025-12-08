import { updateSubscription as updateSubscriptionApi } from "@/services/subscription-api";
import { handleOnError } from "@/shared/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSubscription() {
  const queryClient = useQueryClient();
  const { mutate: updateSubscription, isPending: isUpdatingSubscription } =
    useMutation({
      mutationFn: updateSubscriptionApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
        toast.success("Subscription updated!");
      },
      onError: (err) =>
        handleOnError({
          err,
          title: "Failed to update subscription. Please try again later!",
        }),
    });

  return { updateSubscription, isUpdatingSubscription };
}
