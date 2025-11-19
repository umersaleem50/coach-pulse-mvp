import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Origami, Plus } from "lucide-react";
import NewProjectDialog from "./NewProjectDialog";

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

        <NewProjectDialog>
          <Button>
            <Plus />
            Create Project
          </Button>
        </NewProjectDialog>
      </EmptyContent>
    </Empty>
  );
}

export default EmptyProjectCard;
