import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../components/CustomText";

const PhotosAndDescription = () => {
  return (
    <SafeAreaView>
      <ScrollView className="px-5 py-2 bg-gray-50 h-full">
        <CustomText className="text-4xl pt-2 mt-3" bold text="Photos" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhotosAndDescription;
