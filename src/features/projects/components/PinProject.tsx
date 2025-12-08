import { usePinnedProjects } from "@/features/pin-projects/hooks/usePinnedProjects";
import { usePinProject } from "@/features/pin-projects/hooks/usePinProject";
import { useUnPinProject } from "@/features/pin-projects/hooks/useUnpinProject";
import { Spinner } from "@/shared/components/ui/spinner";
import { Pin, PinOff } from "lucide-react";

import { type ReactNode } from "react";

function PinProject({
  children,
  projectId,
}: {
  children?: ReactNode;
  projectId: string | number;
}) {
  const { isPinning, pinProject } = usePinProject();
  const { isLoading: isUnpinning, unPinProject } = useUnPinProject();
  const { data: pinnedProjects } = usePinnedProjects();

  const isPinned = pinnedProjects?.find(
    (pin) => pin?.project?.id === projectId
  );

  const icon = !isPinned ? <Pin /> : <PinOff />;

  function handleOnPin() {
    pinProject({ project_id: projectId as string });
  }

  function handleOnUnPin() {
    unPinProject({ id: projectId as string });
  }

  return (
    <div
      onClick={isPinned ? handleOnUnPin : handleOnPin}
      className="flex items-center gap-x-2"
    >
      {children}
      {isPinning || isUnpinning ? <Spinner /> : icon}
      <span>{isPinned ? "Unpin Project" : "Pin Project"}</span>
    </div>
  );
}

export default PinProject;
