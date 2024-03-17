import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const giveMeGoogleImageURL = (photo) => {
  return `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}&maxHeightPx=${photo.heightPx}&maxWidthPx=${photo.widthPx}`;
};

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}