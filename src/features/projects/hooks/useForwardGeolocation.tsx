import { searchGeoLocation } from "@/services/api-reverse-geo";
import { useQuery } from "@tanstack/react-query";

export function useSearchLocation(query: string) {
  const {
    data: locations,
    error: searchLocationError,
    isPending: isSearchingLocation,
    refetch: refetchLocations,
  } = useQuery({
    queryFn: () => searchGeoLocation(query),
    queryKey: ["geo-location", query],
    enabled: !!query,
  });

  if (searchLocationError) throw searchLocationError;

  return {
    locations,
    isSearchingLocation,
    refetchLocations,
  };
}
