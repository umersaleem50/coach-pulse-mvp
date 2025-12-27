import { getAllSubscriptions } from "@/services/subscription-api";
import { useQuery } from "@tanstack/react-query";

export function useSubcriptions() {
  const { isPending, data: subscriptions } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getAllSubscriptions,
  });

  return { isPending, subscriptions };
}
