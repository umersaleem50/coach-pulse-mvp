import { Button } from "@/shared/components/ui/button";

import { Origami, Plus } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import NewProjectDialog from "./NewProjectDialog";

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

        <NewProjectDialog>
          <Button>
            <Plus />
            Create Project +
          </Button>
        </NewProjectDialog>
      </EmptyContent>
    </Empty>
  );
}

export default NewProjectCard;
