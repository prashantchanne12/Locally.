import { Text, View } from "react-native";
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { giveMeGoogleImageURL } from "@/utils/utilities";

const Card = ({
  id,
  name,
  tags,
  isOpen,
  howFar,
  photos,
  navigation,
  phoneNumber,
  location,
  isGoogle,
}) => {
  let imageURL = photos[0];
  if (isGoogle) imageURL = giveMeGoogleImageURL(photos[0]);

  return (
    <TouchableWithoutFeedback
      className="border bg-white border-gray-200 pt-2 my-4 relative rounded-xl"
      onPress={() => {
        navigation.navigate("service");
      }}
    >
      {/* ICONS */}
      <View className="absolute z-10 flex-row -top-4 right-1 space-x-2 rounded-full">
        <View className={`bg-[${PRIMARY}] rounded-full p-2`}>
          <Ionicons name="call-outline" size={18} color="white" />
        </View>
        <View className={`bg-[${PRIMARY}] rounded-full p-2`}>
          <MaterialCommunityIcons name="google-maps" size={18} color="white" />
        </View>
      </View>

      {/* NAME AND TAGS */}
      <View className="mb-1 px-[10px]">
        <CustomText text={name} bold className="text-lg" />
        <View className="flex-row items-center justify-between mt-[2px]">
          <View className="flex-row space-x-1">
            {/* {tags.map((tag, index) => (
              <View
                key={`${id}-${tag}-${index}`}
                className="flex-row items-center"
              >
                <FontAwesome name="square" size={4} color="gray" />
                <CustomText
                  text={tag}
                  className="text-gray-500 text-center px-1 text-xs"
                />
              </View>
            ))} */}
          </View>
          <View>
            <View className="items-end">
              <View className="flex-row  items-center space-x-1">
                {isOpen ? (
                  <AntDesign name="checkcircle" size={12} color="#16a085" />
                ) : (
                  <AntDesign name="closecircle" size={12} color="#c0392b" />
                )}
                <CustomText
                  text={isOpen ? "Open" : "Closed"}
                  semibold
                  className="text-[13px] text-[#16a085] text-center"
                />
                <View>
                  <CustomText text={howFar} className="text-xs text-gray-500" />
                </View>
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
          source={imageURL}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
