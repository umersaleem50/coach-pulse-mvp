import { getAddress } from "@/services/api-reverse-geo";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getPosition() {
  if (navigator.geolocation) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
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
