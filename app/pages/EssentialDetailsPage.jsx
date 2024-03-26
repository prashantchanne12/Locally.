import CustomText from "@/app/components/CustomText";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import React from "react";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import {cn, getType, handleCall, handleWhatsApp} from "@/utils/utilities";
import PagerView from 'react-native-pager-view';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import {Image} from "expo-image";
import { Ionicons } from '@expo/vector-icons';
import DetailsHeader from "@/app/components/DetailsHeader";
import Tags from "@/app/components/Tags";
import OpeningHours from "@/app/components/OpeningHours";
import CallButton from "@/app/components/CallButton";
import WhatsappButton from "@/app/components/WhatsappButton";

const EssentialDetailsPage = ({route, navigation}) => {
    const {item} = route.params;
    const isOpen = item.isOpen;

    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <Header small title={item.name} goBack={true} goBackOnClick={() => {navigation.goBack()}} />
                <View>
                    <ScrollView className="bg-white h-full relative px-0.5">
                        <DetailsHeader item={item} isOpen={isOpen} />

                        <View className="px-3.5 mt-3">
                            <Tags item={item}/>
                        </View>

                        <View className="px-3.5 mt-3.5">
                           <View>
                               <View className="flex-row items-center space-x-1">
                                   <View className="h-5 w-1 bg-[#16a085]"></View>
                                   <CustomText text="Prices." bold className="text-lg" />
                               </View>
                               <CustomText text="Average prices*" className="text-xs text-gray-500" />
                           </View>

                            <View className="flex-row space-x-5 mt-2.5 p-1">
                                <View className="space-y-0.5">
                                    <CustomText text="Monthly" className="text-base"/>
                                    <CustomText text="6 Months" className="text-base"/>
                                    <CustomText text="Annually" className="text-base"/>
                                </View>
                                <View className="h-full w-[1px] bg-gray-200"></View>
                                <View className="space-y-0.5">
                                    <CustomText text={'₹ '+item.average_price[0]} className="text-base" semibold/>
                                    <CustomText text={'₹ '+item.average_price[1]} className="text-base" semibold/>
                                    <CustomText text={'₹ '+item.average_price[2]} className="text-base" semibold/>
                                </View>
                            </View>
                        </View>

                        <OpeningHours item={item} isOpen={isOpen}/>
                    </ScrollView>
                    <View className="absolute right-3.5 bottom-[180px] space-y-2.5">
                        <View>
                            <CallButton contact_numbers={item.contact_numbers} />
                        </View>
                        <View>
                            <WhatsappButton contact_numbers={item.contact_numbers} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
export default EssentialDetailsPage;

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
