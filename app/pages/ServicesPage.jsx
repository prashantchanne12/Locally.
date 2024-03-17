import {Dimensions, Text, View} from "react-native";
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
import * as Location from "expo-location";
import {calculateDistance, cn, getCurrentLocation} from "@/utils/utilities";

const essentialItems = [
  {
    name: "Milk",
    image: require("@/assets/images/milk.svg"),
  },
  {
    name: "Internet",
    image: require("@/assets/images/internet.svg"),
  },
  {
    name: "Electrician",
    image: require("@/assets/images/electrician.svg"),
  },
  {
    name: "Gyms",
    image: require("@/assets/images/jim.svg"),
  },
  {
    name: "Carpenter",
    image: require("@/assets/images/carpenter.svg"),
  },
  {
    name: "Painter",
    image: require("@/assets/images/painter.svg"),
  }
];

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
        <ScrollView className="bg-white h-full px-3 ">
          {/*<Essentials />*/}
          <Explore services={services} navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ServicesPage;

const Explore = ({ services = [], navigation }) => {

  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    (async () => {
      const location = await getCurrentLocation();
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    })();
  }, []);


  return (
    <View className="">
      <View className="items-center flex-row">
        <CustomText
          text="Nearby Services."
          className={`p-2 text-center text-xl`}
          bold
        />
      </View>
      <View className="mb-32">
        {services.length ? (
          services.map((service) => (
            <Card
              key={service.id}
              id={service.id}
              name={service.name}
              howFar={calculateDistance(currentLocation, service.location)}
              isOpen={true}
              types={service.types}
              photos={service.photos}
              navigation={navigation}
              isGoogle={false}
              openingHours={service.opening_hours}
            />
          ))
        ) : (
          <CustomText text="Loading..." />
        )}
      </View>
    </View>
  );
};

const Essentials = () => {
  const width = Dimensions.get("window").width;
  return (
      <View>
        <View>
          <CustomText
              text="Essentials."
              className={`p-2 text-[${PRIMARY}] text-base`}
              bold
          />
        </View>
        <View className="flex-row flex-wrap gap-3 items-center justify-center mt-0" >
          {
            essentialItems.map(item => (
                <View
                    key={item.name}
                    className="py-4 px-2 border-0"
                    style={{
                      width: 150,
                      elevation: 0.5,
                    }}>
                  <CustomText text={item.name} semibold className="text-center text-base"/>
                </View>
            ))
          }
        </View>
      </View>
  );
};