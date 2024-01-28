import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../components/CustomText";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/Input";
import { Controller, useForm } from "react-hook-form";

const PhotosAndDescription = () => {
  const [selectedImages, setSelectedImage] = useState([]);

  const {
    control,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: null,
    },
  });

  const handleSubmit = () => {
    originalHandleSubmit(onSubmit)();
  };

  const onSubmit = (data: any) => {
    // Simulate form submission
    console.log("Submitted Data:", data);
    // router.push("/(pages)/Home");
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage([...selectedImages, ...result.assets]);
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
        <View className="flex-row gap-3 my-1 items-center flex-wrap">
          {selectedImages &&
            selectedImages.map((image, index) => (
              <View key={index} className="relative">
                <Image
                  source={image.uri}
                  className="w-20 h-20 border border-gray-200"
                  contentFit="cover"
                />
                <TouchableOpacity
                  onPress={() => {
                    removeImage(image.fileName);
                  }}
                  className="absolute -right-[13px] -top-[12px]"
                >
                  <Ionicons name="close-circle" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ))}
          <View className="mt-5 justify-center items-center">
            <Ionicons
              name="add-circle-outline"
              onPress={pickImageAsync}
              size={48}
              color="#6c5ce7"
            />
            <CustomText
              text={selectedImages.length ? "Add more" : "Click to select"}
              className="text-gray-400 text-xs text-center"
            />
          </View>
        </View>
        <View className="mt-5">
          <CustomText
            text="description*"
            bold
            primary
            className="capitalize text-base mb-3 pt-1"
          />
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  placeholder="Add a description*"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  numberOfLines={4}
                />
              )}
              name="description"
            />
            {errors.description && (
              <CustomText
                text="This field is required."
                className="text-sm text-red-700"
              />
            )}
          </View>
        </View>
        <View className="flex-row justify-end items-center space-x-2  mt-5">
          <Button text="Prev" />
          <Button onClick={handleSubmit} text="Next" primary title="Submit" />
        </View>
      </ScrollView>
    </View>
  );
};

export default PhotosAndDescription;
