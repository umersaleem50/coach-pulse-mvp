import { usePinProject } from "@/features/pin-projects/hooks/usePinProject";
import { useUnPinProject } from "@/features/pin-projects/hooks/useUnpinProject";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Pin } from "lucide-react";

function PinProjectButton({ projectId }: { projectId: string }) {
  const { isPinning, pinProject } = usePinProject();

  function handleOnPin() {
    pinProject({ project_id: projectId });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleOnPin}
          isLoading={isPinning}
        >
          <Pin />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Pin project on sidebar.</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default PinProjectButton;
