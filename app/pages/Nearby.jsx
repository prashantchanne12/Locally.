import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ServicePage from "./ServicePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import CardWrapper from "../components/CardWrapper";

const Stack = createNativeStackNavigator();

const Nearby = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="list" component={CardWrapper} />
        <Stack.Screen name="service" component={ServicePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nearby;
