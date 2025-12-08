import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWeeksAndDays(days: number): string {
  if (days <= 7) return `${days} days`;
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  return `${weeks} week${weeks !== 1 ? "s" : ""} ${remainingDays} day${
    remainingDays !== 1 ? "s" : ""
  }`;
}
