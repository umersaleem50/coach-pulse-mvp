import { ArrowRight } from "lucide-react";
import { useMultiStepForm } from "../hooks/use-stepped-form";
import { Button, type ButtonProps } from "./ui/button";

function StepperNextButton({ onClick, type, ...rest }: ButtonProps) {
  const { isLastStep } = useMultiStepForm();
  return (
    <Button
      onClick={onClick}
      variant={"default"}
      type={type ?? "button"}
      {...rest}
    >
      {isLastStep ? "Submit" : "Continue"}
      {isLastStep ? null : <ArrowRight />}
    </Button>
  );
}

export default StepperNextButton;
