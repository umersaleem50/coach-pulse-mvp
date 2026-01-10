import { DialogDescription } from "@radix-ui/react-dialog";
import { useMultiStepForm } from "../hooks/use-stepped-form";
import { DialogHeader, DialogTitle } from "./ui/dialog";

function MultiStepFormHeader() {
  const { currentStep } = useMultiStepForm();
  return (
    <DialogHeader>
      <DialogTitle>{currentStep.title}</DialogTitle>
      <DialogDescription>{currentStep.description}</DialogDescription>
    </DialogHeader>
  );
}

export default MultiStepFormHeader;
