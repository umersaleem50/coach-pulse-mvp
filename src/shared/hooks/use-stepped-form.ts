import type { MultiFormContextProps } from "@/types";
import { useContext } from "react";
import { MultiStepFormContext } from "../components/MultiStepForm";

export function useMultiFormContext<T extends Record<string, unknown>>() {
  const ctx = useContext(MultiStepFormContext);
  if (!ctx) {
    throw new Error("useMultiFormContext must be used within MultiStepForm");
  }
  return ctx as MultiFormContextProps<T>;
}
