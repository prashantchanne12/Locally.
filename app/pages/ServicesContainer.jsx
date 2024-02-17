import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicesPage from "./ServicesPage";
import ServiceDetailsPage from "./ServiceDetailsPage";
const Stack = createNativeStackNavigator();

const Services = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="services" component={ServicesPage} />
        <Stack.Screen name="service" component={ServiceDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Services;
