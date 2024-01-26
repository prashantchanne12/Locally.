import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../components/CustomText";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

const PhotosAndDescription = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      //   console.log(result);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View className="bg-white h-full">
      <ScrollView className="px-5 py-5 h-full">
        <Image
          placeholder={blurhash}
          source={selectedImage}
          className="w-full h-[250px] mb-5"
        />
        <Button text="Pick an image" primary onClick={pickImageAsync} />
      </ScrollView>
    </View>
  );
};

export default PhotosAndDescription;
