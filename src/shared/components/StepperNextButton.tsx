import { ArrowRight, CircleCheck } from "lucide-react";
import { useMultiFormContext } from "../hooks/use-stepped-form";
import { Button, type ButtonProps } from "./ui/button";

function StepperNextButton({ onClick, type, ...rest }: ButtonProps) {
  const { isLastStep, isLoading } = useMultiFormContext();
  return (
    <Button
      {...rest}
      onClick={onClick}
      variant={"default"}
      type={type ?? "button"}
      isLoading={isLoading}
    >
      {isLastStep ? (
        <>
          <span>Submit</span>
          {<CircleCheck />}
        </>
      ) : (
        "Continue"
      )}
      {isLastStep ? null : <ArrowRight />}
    </Button>
  );
}

export default StepperNextButton;
