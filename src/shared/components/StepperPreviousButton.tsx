import { useMultiStepForm } from "../hooks/use-stepped-form";
import { Button } from "./ui/button";

function StepperPreviousButton() {
  const { isFirstStep, previousStep } = useMultiStepForm();
  return (
    <Button onClick={previousStep} disabled={isFirstStep} variant={"outline"}>
      Previous
    </Button>
  );
}

export default StepperPreviousButton;
