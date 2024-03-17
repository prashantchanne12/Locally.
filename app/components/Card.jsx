import {View} from "react-native";
import React, {useEffect, useState} from "react";
import CustomText from "./CustomText";
import {AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons,} from "@expo/vector-icons";
import {PRIMARY} from "@/utils/constants";
import {Image} from "expo-image";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {cn, giveMeGoogleImageURL} from "@/utils/utilities";
import * as Location from "expo-location";
import { SimpleLineIcons } from '@expo/vector-icons';
const Card = ({
  id,
  name,
  types,
  howFar,
  photos,
  navigation,
  phoneNumber,
  location,
  isGoogle,
  openingHours,
  }) => {

  const [isOpen, setIsOpen] = useState(null);

  let imageURL = photos[0];
  if (isGoogle) imageURL = giveMeGoogleImageURL(photos[0]);

  useEffect(() => {
    setIsOpen(isServiceOpen(openingHours));
  }, []);

  return (
    <TouchableWithoutFeedback
      className="border bg-white border-gray-200 border-b-0 pt-2 my-2 relative rounded-xl"
      onPress={() => {
        navigation.navigate("service");
      }}
    style={{
      elevation: 2,
    }}
    >
      {/* NAME AND TAGS */}
      <View className="mb-1 px-[10px]" >
        <View className="flex-row justify-between items-start" >
          <View className="space-y-0.5" >
            <CustomText text={name} bold className="text-lg" />
            <View>
              <View className="flex-row space-x-1">
                {types.map((tag, index) => (
                    <View
                        key={`${id}-${tag}-${index}`}
                        className="flex-row items-center"
                    >
                      <FontAwesome name="square" size={4} color="gray" />
                      <CustomText
                          text={getType(tag)}
                          className="text-gray-500 text-center px-1 text-xs"
                      />
                    </View>
                ))}
              </View>
            </View>
          </View>

          {/* ICONS */}
          <View className="items-start mt-0.5">
            <View className="items-end flex-row space-x-1">
              <View className="flex-row items-center space-x-1">
                {isOpen ? (
                    <AntDesign name="checkcircle" size={12} color="#16a085" />
                ) : (
                    <AntDesign name="closecircle" size={12} color="#c0392b" />
                )}
                <CustomText
                    text={isOpen ? "Open" : "Closed"}
                    semibold
                    className={cn(isOpen ? "text-[#16a085]" : "text-[#c0392b]", "text-xs text-center")}
                />
              </View>
              <View className="flex-row items-center space-x-0.5">
                <SimpleLineIcons name="location-pin" size={15} color="gray" />
                <CustomText text={howFar} className="text-xs text-gray-500" />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* IMAGE */}
      <View className="mt-[5px] relative">
        <Image
          className="w-full h-48 bg-cover rounded-bl-xl rounded-br-xl"
          contentFit="cover"
          source={imageURL}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const getType = (type) => {
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

const isServiceOpen = (openingHours) => {
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

export default Card;


