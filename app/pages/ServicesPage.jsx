import {Dimensions, Text, TouchableOpacity, View} from "react-native";
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
import {AntDesign, FontAwesome, Octicons} from "@expo/vector-icons";
import * as Location from "expo-location";
import {calculateDistance, cn, getCurrentLocation} from "@/utils/utilities";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "@/app/components/Header";
import { useLocationContext } from '@/app/contexts/LocationContext';

const ServicesPage = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const { state, dispatch } = useLocationContext();

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
      <StatusBar style="light" backgroundColor="black" />
      <SafeAreaView>
        <Header title="Locally." />
        <ScrollView className="bg-[#fcfcfc] h-full px-3 ">
          <Essentials navigation={navigation} />
          <Explore services={services} navigation={navigation} dispatch={dispatch} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ServicesPage;

const Explore = ({ services = [], navigation, dispatch}) => {

  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    (async () => {
      const location = await getCurrentLocation();
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      setCurrentLocation(newLocation);
      dispatch({type: "ADD_LOCATION", payload: newLocation});
    })();
  }, []);


  return (
    <View className="mt-3">
      <View className="py-1.5">
        <View className="flex-row items-center space-x-1">
          <View className="h-5 w-1 ml-1 bg-[#16a085]"></View>
          <CustomText text="Nearby Services." bold className="text-lg" />
        </View>
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

const Essentials = ({navigation}) => {
  const width = Dimensions.get("window").width;
  return (
      <View className="mt-3.5">
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row gap-2.5 pl-2 py-1" >
            <TouchableOpacity
                onPress={() => {navigation.push("essential", {title: "Doodhwala"})}}
                className="items-center justify-center p-3  rounded-lg w-[100px] h-[100px] bg-white"
                style={{elevation: 2,}}>
              <MaterialIcons name="local-drink" size={48} color="#0984e3"/>
              <CustomText text="Dhoodhwala" className="text-xs pt-[6px] text-gray-500" semibold/>
            </TouchableOpacity>
            <View className="items-center justify-center p-3 rounded-lg w-[100px] h-[100px] bg-white" style={{elevation: 2,}}>
              <FontAwesome name="wifi" size={47} color="#00b894" />
              <CustomText text="Internet" className="text-xs pt-1 text-gray-500" semibold  />
            </View>
            <View className="items-center justify-center p-3 rounded-lg  w-[100px] h-[100px] bg-white" style={{elevation: 2,}}>
              <MaterialCommunityIcons name="weight-lifter" size={48} color="#d63031" />
              <CustomText text="Gyms" className="text-xs pt-0.5 text-gray-500" semibold  />
            </View>
            <View className="items-center justify-center p-3 rounded-lg w-[100px] h-[100px] bg-white" style={{elevation: 2,}}>
              <MaterialCommunityIcons name="lightning-bolt" size={48} color="#f1c40f" />
              <CustomText text="Electrician" className="text-xs pt-0.5 text-gray-500"  semibold />
            </View>
            {/*<MaterialIcons name="carpenter" size={24} color="black" />*/}
          </View>
        </ScrollView>
      </View>
  );
};