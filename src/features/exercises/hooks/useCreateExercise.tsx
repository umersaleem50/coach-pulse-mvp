import { createExerciseAPI } from "@/services/exercises-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateExercise() {
  function handleOnSuccess(data) {
    console.log("this is exercise data", data);
    toast("Exercise is ready to use in plan.");
    queryClient.invalidateQueries({ queryKey: ["exercises"] });
  }

  function handleOnError(err: Error) {
    console.log("this is error of create exercise", err);
    toast(err.name, { description: err.message });
  }

  const queryClient = useQueryClient();
  const { mutate: createExercise, isPending: isCreatingExercise } = useMutation(
    {
      mutationFn: createExerciseAPI,
      onSuccess: handleOnSuccess,
      onError: handleOnError,
    }
  );

  return { createExercise, isCreatingExercise };
}
