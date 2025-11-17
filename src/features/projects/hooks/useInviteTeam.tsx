import { inviteTeamProject } from "@/services/projects-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useInviteTeam() {
  function handleOnSuccess(data) {
    toast.success("Invite sent successfully to ");
  }

  function handleOnError(error: Error) {
    toast.error(error.message);
  }

  const {} = useMutation({
    mutationFn: inviteTeamProject,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });
}
