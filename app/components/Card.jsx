import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import { PRIMARY } from "@/utils/constants";
import { Image } from "expo-image";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const date = new Date()
  .toLocaleString("en-US", { hour12: false })
  .split(",")[1]
  .trim()
  .slice(0, 5);

const get12HoursTime = (time) => {
  time = time.split(":");
  const hour = parseInt(time[0]);
  const minutes = time[1];
  let finalTime = "";
  if (hour > 12) {
    finalTime = hour - 12 + ":" + minutes + " PM";
  } else {
    if (hour === 0) hour = 12;
    finalTime = hour + ":" + minutes + " AM";
  }
  return finalTime;
};

const isInRange = (start, end, input) => {
  const startMinutes = convertToMinutes(start);
  const endMinutes = convertToMinutes(end);
  const inputMinutes = convertToMinutes(input);

  if (inputMinutes < startMinutes && inputMinutes > endMinutes) {
    return true;
  }

  if (endMinutes < startMinutes) {
    return inputMinutes >= startMinutes || inputMinutes <= endMinutes;
  } else {
    return inputMinutes >= startMinutes && inputMinutes <= endMinutes;
  }
};

const convertToMinutes = (timeString) => {
  var time = timeString.split(":").map(Number);
  return time[0] * 60 + time[1];
};

const Card = ({ service, navigation }) => {
  let time = "";
  const a = service.opens_at.slice(0, 5);
  const b = service.closes_at.slice(0, 5);
  if (isInRange(a, b, date)) {
    time = "Open until " + get12HoursTime(b);
  } else {
    time = "Opens at " + get12HoursTime(a);
  }

  return (
    <TouchableWithoutFeedback
      className="border bg-white border-gray-200 px-2 pt-2 pb-4 my-2"
      onPress={() => {
        navigation.navigate("service");
      }}
    >
      <View>
        <Image
          className="w-full h-48 bg-cover"
          contentFit="cover"
          source={service.images[0]}
        />
      </View>
      <View className="flex-row items-center mt-3 justify-between">
        <CustomText text={service.name} bold className="text-lg" />
        <View className="flex-row items-center gap-1">
          <Ionicons name="star" size={18} color={PRIMARY} />
          <CustomText text="4.5" />
        </View>
      </View>
      <View className="flex-row items-center mt-2 justify-between">
        <View className="flex-row space-x-2">
          {service.tags.map((tag, index) => (
            <View key={`${service.id}-${tag}-${index}`}>
              <CustomText
                text={tag}
                className="border border-gray-200 text-gray-500 text-center p-1 px-2 text-xs"
              />
            </View>
          ))}
        </View>
        <View className="flex-row items-center space-x-1 text-gray-500">
          <Ionicons name="time-outline" size={18} color="black" />
          <CustomText text={time} className="text-xs text-gray-500" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
