import { View, Text } from "react-native";
import React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";

const ServiceDetailsPage = ({ navigation, service }) => {
  return (
    <GestureHandlerRootView>
        <SafeAreaView>
            <Text>ServiceDetailsPage</Text>
        </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ServiceDetailsPage;
