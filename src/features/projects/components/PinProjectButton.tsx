import { usePinnedProjects } from "@/features/pin-projects/hooks/usePinnedProjects";
import { usePinProject } from "@/features/pin-projects/hooks/usePinProject";
import { useUnPinProject } from "@/features/pin-projects/hooks/useUnpinProject";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Pin, PinOff } from "lucide-react";

function PinProjectButton({ projectId }: { projectId: string | number }) {
  const { isPinning, pinProject } = usePinProject();
  const { isLoading: isUnpinning, unPinProject } = useUnPinProject();
  const { data: pinnedProjects } = usePinnedProjects();

  const isPinned = pinnedProjects?.find(
    (pin) => pin?.project?.id === projectId
  );

  function handleOnPin() {
    console.log("this is project id", projectId);
    pinProject({ project_id: projectId as string });
  }

  function handleOnUnPin() {
    unPinProject({ id: projectId as string });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={isPinned ? handleOnUnPin : handleOnPin}
          isLoading={isPinning || isUnpinning}
        >
          {isPinned ? <PinOff /> : <Pin />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isPinned ? (
          <p>Un-Pin project on sidebar.</p>
        ) : (
          <p>Pin project on sidebar.</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export default PinProjectButton;
