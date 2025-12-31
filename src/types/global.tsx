import type { CombinedCheckoutType } from "@/validators/exercises.validator";
import type { LucideIcon } from "lucide-react";
import type { ZodType } from "zod";

export type ProjectUserRoleTypes = "admin" | "owner" | "staff";

export interface UserProfile {
  email: string;
  id: string;
  avatar_url: string;
  full_name: string;
  updated_at?: Date;
}

type FieldKeys = keyof CombinedCheckoutType;

export type FormStep = {
  title: string;
  position: number;
  validationSchema: ZodType<unknown>;
  component: React.ReactElement;
  icon: LucideIcon;
  fields: FieldKeys[];
};

export interface MultiStepFormContextProps {
  currentStep: FormStep;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  steps: FormStep[];
}
