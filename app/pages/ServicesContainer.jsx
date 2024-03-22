import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicesPage from "./ServicesPage";
import ServiceDetailsPage from "./ServiceDetailsPage";
import EssentialsPage from "@/app/pages/EssentialsPage";
const Stack = createNativeStackNavigator();

const Services = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="services" component={ServicesPage} />
        <Stack.Screen name="service" component={ServiceDetailsPage} />
        <Stack.Screen name="essential" component={EssentialsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Services;
