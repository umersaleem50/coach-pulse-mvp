import { Origami } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";

import { CreateProject } from "./FormCreateProject";

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
        <CreateProject />
      </EmptyContent>
    </Empty>
  );
}

export default NewProjectCard;
