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
import { AntDesign, Octicons } from "@expo/vector-icons";

const images = {
  milk: require("@/assets/images/milk.png"),
  internet: require("@/assets/images/internet.png"),
  electrician: require("@/assets/images/electrician.png"),
  jim: require("@/assets/images/jim.png"),
  carpenter: require("@/assets/images/carpenter.png"),
  painter: require("@/assets/images/painter.png"),
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
      <StatusBar style="dark" />
      <SafeAreaView>
        <View className="py-2  flex-row items-center border-b border-gray-100 justify-between bg-white ">
          <View className="flex-1 ml-4">
            <Octicons name="three-bars" size={22} color={PRIMARY} />
          </View>
          <View
            className={`bg-[${PRIMARY}] -ml-4 w-10 justify-center items-center rounded-md py-1 px-2`}
          >
            <CustomText
              text="L"
              className="text-2xl text-center text-white"
              semibold
            />
          </View>
          <View className="flex-1"></View>
        </View>
        <ScrollView className="bg-white h-full p-3">
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
    <View className="mt-2">
      {/* <View className="justify-between items-center flex-row">
        <View className={`flex-1 h-[1px] bg-[${PRIMARY}]`} />
        <CustomText
          text="Explore Local"
          className={`p-2 text-center text-[${PRIMARY}]`}
          semibold
        />
        <View className={`flex-1 h-[1px] bg-[${PRIMARY}]`} />
      </View> */}
      <View className="mt-2">
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
    </View>
  );
};

const Essentails = () => {
  return (
    <View className="">
      <View>
        <View className={`border p-2 border-[${PRIMARY}] rounded-xl`}>
          <View className={`flex-row justify-between items-center  `}>
            <View className="items-center">
              <Image source={images.milk} className="h-20 w-20 bg-cover" />
              <CustomText
                text="Dhoodhwala"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
            <View className="items-center">
              <Image source={images.internet} className="h-20 w-20 bg-cover" />
              <CustomText
                text="Cable & Internet"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-[5px]`}
              />
            </View>
            <View className="items-center">
              <Image
                source={images.electrician}
                className=" h-20 w-20 bg-cover"
              />
              <CustomText
                text="Electricians"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
          </View>
          <View className="flex-row justify-between items-center mt-3">
            <View className="  items-center">
              <Image source={images.jim} className=" h-20 w-20 bg-cover" />
              <CustomText
                text="Gyms"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
            <View className=" items-center  ">
              <Image
                source={images.carpenter}
                className=" h-20 w-20 bg-cover"
              />
              <CustomText
                text="Carpenters"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
            <View className="  items-center">
              <Image source={images.painter} className=" h-20 w-20 bg-cover" />
              <CustomText
                text="Painters"
                semibold
                className={`text-[${PRIMARY}] text-xs pt-1`}
              />
            </View>
          </View>
        </View>
      </View>
      <View className="mt-2 flex-row justify-center">
        <AntDesign name="downcircle" size={25} color={PRIMARY} />
      </View>
    </View>
  );
};
