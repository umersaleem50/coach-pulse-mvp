import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { FileProvider } from "@/store/FileContext";
import React, { useState } from "react";
import { FormCreateProject, projectFormSchema } from "./FormCreateProject";
import type z from "zod";

function EditProjectCard({
  data,
  children,
}: {
  data: z.infer<typeof projectFormSchema>;
  children: React.ReactNode;
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
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Please provide details to create new project.
          </DialogDescription>
        </DialogHeader>
        <FileProvider>
          <FormCreateProject
            data={data}
            onSuccess={handleCloseDialog}
          ></FormCreateProject>
        </FileProvider>
      </DialogContent>
    </Dialog>
  );
}

export default EditProjectCard;
