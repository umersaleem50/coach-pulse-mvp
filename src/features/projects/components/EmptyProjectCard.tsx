import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Origami } from "lucide-react";

import { CreateProject } from "./FormCreateProject";

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

        <CreateProject />
      </EmptyContent>
    </Empty>
  );
}

export default EmptyProjectCard;
