import React, { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { FileProvider } from "@/store/FileContext";
import { FormProject, projectFormSchema } from "./FormCreateProject";

import type z from "zod";

function CreateProjectDialog({
  children,
  project,
}: {
  children: ReactNode;
  project?: z.infer<typeof projectFormSchema>;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  function handleCloseDialog() {
    setOpenDialog((open) => !open);
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? "Update" : "Create New"} Project</DialogTitle>
          <DialogDescription>
            Please provide details to {project ? "update" : "create new"}{" "}
            project.
          </DialogDescription>
        </DialogHeader>
        <FileProvider>
          <FormProject
            onSuccess={handleCloseDialog}
            data={project}
          ></FormProject>
        </FileProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectDialog;
