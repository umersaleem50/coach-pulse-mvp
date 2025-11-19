import type { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { FileProvider } from "@/store/FileContext";

import { FormCreateProject } from "./FormCreateProject";
import { useState } from "react";

function NewProjectDialog({ children }: { children: React.ReactNode }) {
  const [openDialog, setOpenDialog] = useState(false);

  console.log(openDialog);

  function handleCloseDialog() {
    setOpenDialog((open) => !open);
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Please provide details to create new project.
          </DialogDescription>
        </DialogHeader>
        <FileProvider>
          <FormCreateProject onSuccess={handleCloseDialog}></FormCreateProject>
        </FileProvider>
      </DialogContent>
    </Dialog>
  );
}

export default NewProjectDialog;
