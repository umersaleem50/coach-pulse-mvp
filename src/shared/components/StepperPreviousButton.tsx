import { ArrowLeft } from "lucide-react";
import { useMultiFormContext } from "../hooks/use-stepped-form";
import { Button } from "./ui/button";

function StepperPreviousButton() {
  const { isFirstStep, previousStep } = useMultiFormContext();
  return (
    <Button onClick={previousStep} disabled={isFirstStep} variant={"outline"}>
      <ArrowLeft />
      Go Back
    </Button>
  );
}

export default StepperPreviousButton;
