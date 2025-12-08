import { usePinnedProjects } from "@/features/pin-projects/hooks/usePinnedProjects";
import { usePinProject } from "@/features/pin-projects/hooks/usePinProject";
import { useUnPinProject } from "@/features/pin-projects/hooks/useUnpinProject";
import { Button, type ButtonProps } from "@/shared/components/ui/button";
import { Pin, PinOff } from "lucide-react";
import React, { type ReactNode } from "react";

function PinProject({
  children,
  projectId,
  buttonProps,
}: {
  children: ReactNode;
  projectId: string | number;
  buttonProps: ButtonProps;
}) {
  const { isPinning, pinProject } = usePinProject();
  const { isLoading: isUnpinning, unPinProject } = useUnPinProject();
  const { data: pinnedProjects } = usePinnedProjects();

  const isPinned = pinnedProjects?.find(
    (pin) => pin?.project?.id === projectId
  );

  console.log(isPinned, pinnedProjects);

  function handleOnPin() {
    pinProject({ project_id: projectId });
  }

  function handleOnUnPin() {
    unPinProject({ id: projectId });
  }

  return (
    <div
      onClick={isPinned ? handleOnUnPin : handleOnPin}
      className="flex items-center"
    >
      {children}
    </div>
  );
}

export default PinProject;
