import { View, Text } from "react-native";
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
          <View>
            <CustomText text="Essentials" className="text-xl" bold />
          </View>
          <View>
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
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ServicesPage;
