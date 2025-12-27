import { deleteSubscriptionApi } from "@/services/subscription-api";
import { handleOnError } from "@/shared/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteSubscription() {
  const queryClient = useQueryClient();
  const { mutate: deleteSubscription, isPending: isDeleting } = useMutation({
    mutationFn: deleteSubscriptionApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      return toast.success("Subscription Deleted!", {
        description: `Your subscription deleted successfully!`,
      });
    },
    onError: (err) =>
      handleOnError({
        err,
        title: "Something went wrong while deleting subscription.",
      }),
  });

  return { deleteSubscription, isDeleting };
}
