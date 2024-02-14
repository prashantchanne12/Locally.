import { View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { supabase } from "@/utils/supabase";
import Card from "../components/Card";
import CustomText from "../components/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { PRIMARY } from "@/utils/constants";

const images = {
  milk: require("@/assets/images/milk.png"),
  internet: require("@/assets/images/internet.png"),
  electrician: require("@/assets/images/electrician.png"),
  jim: require("@/assets/images/jim.png"),
};

const ServicesPage = ({ navigation }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fethData = async () => {
      let { data: Services, error } = await supabase
        .from("Services")
        .select("*");

      setServices(Services);
    };

    fethData();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView className="bg-white h-full p-3">
          <StatusBar style="dark" />
          <Essentails />
          <Explore services={services} navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ServicesPage;

const Explore = ({ services, navigation }) => {
  return (
    <View className="mt-5">
      <View>
        <CustomText
          text="Explore local"
          className={`text-[${PRIMARY}] text-lg`}
          bold
        />
      </View>
      {services.map((service) => (
        <Card
          key={service.id}
          id={service.id}
          name={service.name}
          howFar="6.6 km"
          isOpen={true}
          tags={service.tags}
          photos={service.photos}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

const Essentails = () => {
  return (
    <View className="">
      <View>
        <CustomText
          text="Essentials"
          className={`text-[${PRIMARY}] text-lg`}
          bold
        />
        <View className="mt-2 rounded-xl border">
          <View className="flex-row justify-between border-b">
            <View className="py-3 pb-4 px-4 items-center">
              <Image source={images.milk} className=" h-24 w-32 bg-cover" />
              <CustomText
                text="Dhoodhwala"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
            <View className="w-0 border-r" />
            <View className=" py-3 pb-4 px-4 items-center">
              <Image source={images.internet} className=" h-24 w-32 bg-cover" />
              <CustomText
                text="Cable & Internet"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="py-3 pb-4 px-4 items-center">
              <Image
                source={images.electrician}
                className=" h-24 w-32 bg-cover"
              />
              <CustomText
                text="Electricians"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
            <View className="w-0 border-r" />
            <View className=" rounded-lg items-center py-3 pb-4 px-4 ">
              <Image source={images.jim} className=" h-24 w-32 bg-cover" />
              <CustomText
                text="Gyms"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
          </View>
        </View>
      </View>
      <View className="mt-2">
        <CustomText
          text="Show more"
          className="text-xs pt-1 text-gray-500 text-center"
          semibold
        />
      </View>
    </View>
  );
};
