import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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
  // const a = service.opens_at.slice(0, 5);
  // const b = service.closes_at.slice(0, 5);
  // if (isInRange(a, b, date)) {
  //   time = "Open until " + get12HoursTime(b);
  // } else {
  //   time = "Opens at " + get12HoursTime(a);
  // }

  return (
    <TouchableWithoutFeedback
      className="border bg-white border-gray-200 pt-2 my-4 relative rounded-xl"
      onPress={() => {
        navigation.navigate("service");
      }}
    >
      {/* ICONS */}
      <View className="absolute z-10 flex-row -top-4 right-1 space-x-2 rounded-full">
        <View className="bg-[#2c3e50] rounded-full p-2 ">
          <Ionicons name="call-outline" size={18} color="white" />
        </View>
        <View className="bg-[#2c3e50] rounded-full p-2">
          <MaterialCommunityIcons name="google-maps" size={18} color="white" />
        </View>
      </View>

      {/* NAME AND TAGS */}
      <View className="mb-1 px-[10px]">
        <CustomText text={service.name} bold className="text-lg" />
        <View className="flex-row items-center justify-between mt-[2px]">
          <View className="flex-row space-x-1">
            {service.tags.map((tag, index) => (
              <View
                key={`${service.id}-${tag}-${index}`}
                className="flex-row items-center"
              >
                <FontAwesome name="square" size={4} color="gray" />
                <CustomText
                  text={tag}
                  className="text-gray-500 text-center px-1 text-xs"
                />
              </View>
            ))}
          </View>
          <View>
            <View className="items-end">
              <View className="flex-row  items-center space-x-1">
                <AntDesign name="checkcircle" size={12} color="#16a085" />
                <CustomText
                  text="Open"
                  semibold
                  className="text-[13px] text-[#16a085] text-center"
                />
                <View>
                  <CustomText text="6.6 km" className="text-xs text-gray-500" />
                </View>
                {/* <AntDesign name="closecircle" size={12} color="#c0392b" />
            <CustomText
              text="Closed"
              semibold
              className="text-[13px] text-[#c0392b] text-center"
            /> */}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* IMAGE */}
      <View className="mt-[10px] relative">
        <Image
          className="w-full h-48 bg-cover rounded-tl rounded-tr rounded-bl-xl rounded-br-xl"
          contentFit="cover"
          source={service.images[0]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
