import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import { PRIMARY } from "@/utils/constants";
import { Image } from "expo-image";

const Card = ({ service }) => {
  // TODO
  // Conditionally show opens_at closes_at
  // if before opens_at show = opens_at
  // if after opens_at show = open until
  return (
    <View className="border bg-white border-gray-200 px-2 pt-2 pb-4 my-2">
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
          <CustomText
            text={
              service.opens_at.slice(0, 5) +
              "AM to " +
              service.closes_at.slice(0, 5) +
              "PM"
            }
            className="text-xs text-gray-500"
          />
        </View>
      </View>
    </View>
  );
};

export default Card;
