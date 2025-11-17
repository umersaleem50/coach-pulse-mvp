import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Origami, Plus } from "lucide-react";
import { FormCreateProject } from "./FormCreateProject";
import { FileProvider } from "@/store/FileContext";
import { useState } from "react";

function NewProjectCard() {
  const [openDialog, setOpenDialog] = useState(false);

  function handleCloseDialog() {
    setOpenDialog((open) => !open);
  }

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

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Please provide details to create new project.
              </DialogDescription>
            </DialogHeader>
            <FileProvider>
              <FormCreateProject
                onSuccess={handleCloseDialog}
              ></FormCreateProject>
            </FileProvider>
          </DialogContent>
        </Dialog>
      </EmptyContent>
    </Empty>
  );
}

export default NewProjectCard;
