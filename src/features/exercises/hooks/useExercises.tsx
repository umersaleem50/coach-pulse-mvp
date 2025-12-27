import { getExercises } from "@/services/exercises-api";
import { useQuery } from "@tanstack/react-query";

export function useExercises() {
  const { isPending: isLoadingExercises, data: exercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });

  return { isLoadingExercises, exercises };
}
