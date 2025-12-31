import { type FormStep } from "@/types/global";
import Step1 from "./checkout/step1";
import Step2 from "./checkout/step2";
import Step3 from "./checkout/step3";

import MultiStepForm from "@/components/stepped-form/stepped-form";
import { HomeIcon, UserIcon, CreditCardIcon } from "lucide-react";
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "@/validators/exercises.validator";

export const checkoutSteps: FormStep[] = [
  {
    title: "Step 1: Personal Information",
    component: <Step1 />,
    icon: UserIcon,
    position: 1,
    validationSchema: step1Schema,
    fields: ["email", "firstName", "lastName"],
  },
  {
    title: "Step 2: Address Details",
    component: <Step2 />,
    icon: HomeIcon,
    position: 2,
    validationSchema: step2Schema,
    fields: ["country", "city", "shippingAddress"],
  },
  {
    title: "Step 3: Payment Details",
    component: <Step3 />,
    icon: CreditCardIcon,
    position: 3,
    validationSchema: step3Schema,
    fields: ["cardNumber", "cardholderName", "cvv"],
  },
];

export default function ExerciseForm() {
  return <MultiStepForm steps={checkoutSteps} />;
}
