import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import { getAddress } from "@/services/api-reverse-geo";
import type { FilterFn } from "@tanstack/react-table";

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

function getPosition(): Promise<GeolocationPosition> {
  if (!navigator.geolocation) {
    return Promise.reject(
      new Error("Geolocation is not supported by this browser.")
    );
  }

  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = [
    positionObj?.coords?.latitude,
    positionObj?.coords?.longitude,
  ];

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}

export const arrayIncludesFilter = <T>(
  row: Parameters<FilterFn<T>>[0],
  columnId: Parameters<FilterFn<T>>[1],
  filterValue: Parameters<FilterFn<T>>[2]
): boolean => {
  const values = row.getValue<unknown>(columnId);

  return Array.isArray(values) && values.includes(filterValue);
};
