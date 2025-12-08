import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
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

export function handleOnError({
  err,
  title,
  description,
}: {
  err: Error;
  title: string;
  description?: string;
}) {
  const isDevelopment = import.meta.env.DEV;
  const errorMessage = isDevelopment ? err.name : title;
  const errorDescription = isDevelopment ? err.message : description;
  return toast.error(errorMessage, { description: errorDescription });
}

export function formatCurrency(amount: number, currency?: string) {
  const userLocale = navigator?.language || "en-US";
  const formated = Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
  return formated;
}
