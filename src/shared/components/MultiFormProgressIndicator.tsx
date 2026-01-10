"use client";

import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/shared/components/ui/stepper";

export default function MultiFormProgressIndicator({
  totalSteps = 3,
  currentStep,
  onPrevious,
  onNext,
  actions = true,
}: {
  totalSteps: number;
  currentStep: number;
  onPrevious: any;
  onNext: any;
  actions?: boolean;
}) {
  const steps = Array(totalSteps)
    .fill("")
    .map((_, i) => i + 1);

  return (
    <div className="mx-auto w-full max-w-xl space-y-8 text-center relative">
      <div className="flex items-center gap-2">
        {actions ? (
          <Button
            className="shrink-0"
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={currentStep === 1}
            aria-label="Prev step"
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </Button>
        ) : null}
        <Stepper value={currentStep} onValueChange={onNext} className="gap-1">
          {steps.map((step) => (
            <StepperItem key={step} step={step} className="flex-1">
              <StepperTrigger
                className="w-full flex-col items-start gap-2"
                asChild
              >
                <StepperIndicator asChild className="bg-border h-1 w-full">
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
