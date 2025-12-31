import { createExercise as createExerciseApi } from "@/services/exercises-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateExercise() {
  function handleOnSuccess() {
    toast("Exercise is ready to use in plan.");
    queryClient.invalidateQueries({ queryKey: ["exercises"] });
  }

  function handleOnError(err: Error) {
    toast(err.name, { description: err.message });
  }

  const queryClient = useQueryClient();
  const { mutate: createExercise, isPending: isCreatingExercise } = useMutation(
    {
      mutationFn: createExerciseApi,
      onSuccess: handleOnSuccess,
      onError: handleOnError,
    }
  );

  return { createExercise, isCreatingExercise };
}
