import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import * as Location from "expo-location";

export const giveMeGoogleImageURL = (photo) => {
  return `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}&maxHeightPx=${photo.heightPx}&maxWidthPx=${photo.widthPx}`;
};

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  }
  return await Location.getCurrentPositionAsync({});
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
}

export const calculateDistance = (location1, location2) => {
  const lat1 = location1.latitude;
  const lon1 = location1.longitude;
  const lat2 = location2.latitude;
  const lon2 = location2.longitude;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  if (distance < 1) {
    return (distance * 1000).toFixed(0) + " m"; // Distance in meters, rounded to nearest meter
  } else {
    return distance.toFixed(1) + " km"; // Distance in kilometers, rounded to one decimal place
  }
}