import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Origami } from "lucide-react";

function handleCreateProject() {
  // NOTHING TO EXECUTE HERE. IDIOT!!!
}

function EmptyProjectCard() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Origami />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyContent>
        <EmptyTitle>No Project Found!</EmptyTitle>
        <EmptyDescription>
          Create a new project for your organization.
        </EmptyDescription>
        <Button onClick={handleCreateProject}>Create Project</Button>
      </EmptyContent>
    </Empty>
  );
}

export default EmptyProjectCard;
