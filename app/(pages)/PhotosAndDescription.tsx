import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../components/CustomText";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const PhotosAndDescription = () => {
  const [selectedImages, setSelectedImage] = useState([]);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets);
    } else {
      alert("You did not select any image.");
    }
  };

  const removeImage = (fileName: string) => {
    const newSelectedImages = selectedImages.filter(
      (image) => image.fileName !== fileName
    );
    setSelectedImage(newSelectedImages);
  };

  return (
    <View className="bg-white h-full">
      <ScrollView className="px-5 py-5 h-full">
        <CustomText
          text={selectedImages.length ? "Selected Images" : "Add Images"}
          bold
          primary
          className="capitalize text-base mb-3 pt-1"
        />
        <View className="flex-row space-x-3 my-1 items-center flex-wrap">
          {selectedImages &&
            selectedImages.map((image) => (
              <View key={image.fileName} className="relative">
                <Image
                  source={image.uri}
                  className="w-20 h-20 border border-gray-200"
                  contentFit="cover"
                />
                <TouchableOpacity
                  onPress={() => {
                    removeImage(image.fileName);
                  }}
                  className="absolute -right-[11px] -top-[10px]"
                >
                  <Ionicons name="close-circle" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ))}
          <View className="mt-8 justify-center items-center">
            <Ionicons
              name="add-circle-outline"
              onPress={pickImageAsync}
              size={48}
              color="#6c5ce7"
            />
            <CustomText
              text="Add more"
              className="text-gray-400 text-xs text-center"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PhotosAndDescription;
