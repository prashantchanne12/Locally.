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


export const getType = (type) => {
  return type.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}

const isOpenDuringTime = (schedule, time) => {
  // Convert time strings to minutes
  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(part => parseInt(part));
    return hours * 60 + minutes;
  };

  const parse12HourTime = (timeString) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(part => parseInt(part));
    const totalMinutes = hours * 60 + minutes;
    if (period.toLowerCase() === 'pm' && hours !== 12) {
      return totalMinutes + 12 * 60; // add 12 hours for PM times except 12 PM
    }
    return totalMinutes;
  };

  const openTime = parse12HourTime(schedule.open);
  const closeTime = parse12HourTime(schedule.close);
  const targetTime = parse12HourTime(time);

  // Check if target time is between open and close times
  return targetTime >= openTime && targetTime <= closeTime;
}

const getCurrentTime = () => {
  const now = new Date(); // Get the current date and time
  let hours = now.getHours(); // Get the current hour (0-23)
  let minutes = now.getMinutes(); // Get the current minute (0-59)
  const ampm = hours >= 12 ? 'pm' : 'am'; // Determine AM or PM

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle 0 as 12 PM

  // Pad minutes with leading zero if needed
  minutes = minutes.toString().padStart(2, '0');

  // Format the time string
  return `${hours}:${minutes} ${ampm}`;
}

export const isServiceOpen = (openingHours) => {
  let day = new Date();
  day = day.getDay() - 1;
  let currentWorkingHours = null;
  if (day < 0){
    currentWorkingHours = openingHours[openingHours.length - 1]
  }else{
    currentWorkingHours = openingHours[day]
  }

  if (currentWorkingHours.isClosed) return false
  return  isOpenDuringTime(currentWorkingHours, getCurrentTime())
}