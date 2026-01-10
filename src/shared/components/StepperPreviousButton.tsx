import { ArrowLeft } from "lucide-react";
import { useMultiStepForm } from "../hooks/use-stepped-form";
import { Button } from "./ui/button";

function StepperPreviousButton() {
  const { isFirstStep, previousStep } = useMultiStepForm();
  return (
    <Button onClick={previousStep} disabled={isFirstStep} variant={"outline"}>
      <ArrowLeft />
      Go Back
    </Button>
  );
}

export default StepperPreviousButton;
