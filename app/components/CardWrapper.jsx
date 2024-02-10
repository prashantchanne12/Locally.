import { View, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { supabase } from "@/utils/supabase";
import Card from "./Card";

const CardWrapper = ({ navigation }) => {
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
      <ScrollView className="bg-white h-full p-3">
        <StatusBar style="dark" />
        <View>
          {services.map((service) => (
            <Card key={service.id} service={service} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default CardWrapper;
