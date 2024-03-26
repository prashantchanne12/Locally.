import { View, Text } from "react-native";
import React from "react";
import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import DetailsHeader from "@/app/components/DetailsHeader";
import Tags from "@/app/components/Tags";
import OpeningHours from "@/app/components/OpeningHours";
import CallButton from "@/app/components/CallButton";
import WhatsappButton from "@/app/components/WhatsappButton";

const ServiceDetailsPage = ({ route, navigation }) => {
  const {service} = route.params;

  return (
    <GestureHandlerRootView>
        <SafeAreaView>
            <Header small title={service.name} goBack={true} goBackOnClick={() => {navigation.goBack()}} />
            <View>
                <ScrollView className="bg-white h-full relative px-0.5">
                    <DetailsHeader item={service} isOpen={service.isOpen} />
                    <View className="px-3.5 mt-3">
                        <Tags item={service} />
                    </View>
                    <OpeningHours item={service} isOpen={service.isOpen} />
                </ScrollView>
                <View className="absolute right-3.5 bottom-[180px] space-y-2.5">
                    <View>
                        <CallButton contact_numbers={service.contact_numbers} />
                    </View>
                    <View>
                        <WhatsappButton contact_numbers={service.contact_numbers} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ServiceDetailsPage;
