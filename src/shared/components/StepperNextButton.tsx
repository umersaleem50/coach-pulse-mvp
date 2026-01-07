import { useMultiStepForm } from "../hooks/use-stepped-form";
import { Button, type ButtonProps } from "./ui/button";

function StepperNextButton({ onClick, type, ...rest }: ButtonProps) {
  const { isLastStep } = useMultiStepForm();
  return (
    <Button
      onClick={onClick}
      disabled={isLastStep}
      variant={"outline"}
      type={type ?? "button"}
      {...rest}
    >
      {isLastStep ? "Submit" : "Continue"}
    </Button>
  );
}

export default StepperNextButton;
