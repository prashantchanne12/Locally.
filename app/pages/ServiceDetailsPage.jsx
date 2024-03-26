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
import CustomText from "@/app/components/CustomText";
import PriceTable from "@/app/components/PriceTable";

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
                    {service.price_tables ?
                        <View className="px-3.5 mt-3.5">
                            <View>
                                <View className="flex-row items-center space-x-1">
                                    <View className="h-5 w-1 bg-[#16a085]"></View>
                                    <CustomText text="Prices." bold className="text-lg" />
                                </View>
                                <CustomText text="Average prices*" className="text-xs text-gray-500" />
                            </View>

                            <View className="mt-2.5 p-1">
                                <PriceTable prices={service.price_table} />
                            </View>

                        </View>
                    : <></>}
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
