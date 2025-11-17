import { fetchAddress } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export function useGeoLocation() {
  const { mutate: getPosition, isPending } = useMutation({
    mutationFn: fetchAddress,
  });

  return { getPosition, isPending };
}
