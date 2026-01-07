import { useContext } from "react";
import { MultiStepFormContext } from "../components/StepperForm";

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within MultiStepForm.Provider"
    );
  }
  return context;
};
