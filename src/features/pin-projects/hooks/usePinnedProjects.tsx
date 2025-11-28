import { getPinnedProjects } from "@/services/pin-project-api";
import { useQuery } from "@tanstack/react-query";

export function usePinnedProjects() {
  const { data, isPending } = useQuery({
    queryFn: getPinnedProjects,
    queryKey: ["pinned-projects"],
  });

  return { data, isPending };
}
