import { deleteUserExerciseAPI } from "@/services/exercises-api";
import { handleMutationError } from "@/shared/lib/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteExercise() {
  const queryClient = useQueryClient();
  function handleOnSuccess() {
    toast.success("Exercise deleted successfully!");
    queryClient.invalidateQueries({ queryKey: ["exercises"] });
  }

  function handleOnError(err: Error) {
    return handleMutationError(
      err,
      undefined,
      "Failed to delete exercise. Please try again later!"
    );
  }

  const { mutate: deleteUserExercise, isPending: isDeletingExercise } =
    useMutation({
      mutationFn: deleteUserExerciseAPI,
      onSuccess: handleOnSuccess,
      onError: handleOnError,
    });

  return { deleteUserExercise, isDeletingExercise };
}
