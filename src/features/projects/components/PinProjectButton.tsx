import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Pin } from "lucide-react";

function PinProjectButton() {
  function handleOnPin() {
    alert("pin");
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"outline"} size={"icon"} onClick={handleOnPin}>
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
