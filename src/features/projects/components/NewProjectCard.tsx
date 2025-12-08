import { Origami } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";

import CreateProjectDialog from "./CreateProjectDialog";

function NewProjectCard() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Origami />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyContent>
        <EmptyTitle>Start New Project</EmptyTitle>
        <EmptyDescription>
          Create a new project for your organization.
        </EmptyDescription>
        <CreateProjectDialog>
          <Button>Create Project</Button>
        </CreateProjectDialog>
      </EmptyContent>
    </Empty>
  );
}

export default NewProjectCard;
