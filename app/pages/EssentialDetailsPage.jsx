import CustomText from "@/app/components/CustomText";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import React from "react";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import {calculateDistance, cn, getType} from "@/utils/utilities";
import PagerView from 'react-native-pager-view';
import {StyleSheet, View, Text, TouchableOpacity, Touchable, TouchableHighlight} from 'react-native';
import {Image} from "expo-image";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const EssentialDetailsPage = ({route, navigation}) => {
    const {item} = route.params;
    const isOpen = true;
    const howFar = "100m"

    const actions = [
        {
            text: "Accessibility",
            icon: <FontAwesome name="whatsapp" size={24} color="black" />,
            name: "bt_accessibility",
            position: 1
        },
    ];
    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <Header title={item.name} goBack={true} goBackOnClick={() => {navigation.goBack()}} />
                <View>
                    <ScrollView className="bg-white h-full relative px-0.5">
                        <View className="mt-3.5 px-3.5">
                            <View className="flex-row justify-between items-center">
                                <View>
                                    {/*14947b*/}
                                    <CustomText text={item.name} bold className="text-2xl text-[#14947b]"/>
                                    <View className="flex-row items-center">
                                        <CustomText text={item.address[0]['address1'] + '.'} className="text-gray-500 text-[13px]" />
                                    </View>
                                </View>
                                <View className={"mt-1"}>
                                    <View className={"mt-0"}>
                                        <View className="flex-row">
                                            <CustomText text={"Home delivery"} semibold className="text-gray-600 pt-0.5" />
                                        </View>
                                    </View>
                                    <View className="items-end justify-end flex-row space-x-1 mt-[3px] ">
                                        <View className="flex-row items-center space-x-1">
                                            {isOpen ? (
                                                <AntDesign name="checkcircle" size={12} color="#16a085" />
                                            ) : (
                                                <AntDesign name="closecircle" size={12} color="#c0392b" />
                                            )}
                                            <CustomText
                                                text={isOpen ? "Open" : "Closed"}
                                                semibold
                                                className={cn(isOpen ? "text-[#16a085]" : "text-[#c0392b]", "text-xs text-center")}
                                            />
                                        </View>
                                        <View className="flex-row items-center space-x-0.5">
                                            <SimpleLineIcons name="location-pin" size={15} color="gray" />
                                            <CustomText text={"100m"} className="text-xs text-gray-500" />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, height: 200 }} className="mt-3.5 px-3.5">
                            <PagerView style={styles.viewPager} initialPage={0}>
                                {
                                    item.photos.map((image, index) => (
                                        <View key={index}>
                                            <Image
                                                source={image}
                                                className="w-full h-full object-contain rounded-lg" />
                                        </View>
                                    ))
                                }
                            </PagerView>
                        </View>
                        <View className="px-3.5 mt-3.5">
                            <CustomText text={item.desc} className="text-justify text-[15px]" />
                        </View>
                        <View className="px-3.5 mt-3">
                            <View className="flex-row space-x-2 py-1">
                                {
                                    item.is_essential ?
                                        <View className="bg-gray-200 rounded" style={{elevation: 1}} key={0}>
                                            <CustomText text={item.essential_type} bold className="px-2.5 py-1.5 text-[13px]"/>
                                        </View>
                                        : <></>
                                }
                                {
                                    item.types.map((type, index) => (
                                        <View key={index+1} className="bg-gray-200 rounded z-50" style={{elevation: 1}}>
                                            <CustomText text={getType(type)} bold className="px-2.5 py-1.5 text-[13px]"/>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View className="px-3.5 mt-3.5">
                           <View>
                               <View className="flex-row items-center space-x-1">
                                   <View className="h-5 w-1 bg-[#16a085]"></View>
                                   <CustomText text="Prices." bold className="text-xl" />
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
                        <View className="px-3.5 mt-3.5 mb-44">
                            <View>
                                <View className="flex-row items-center space-x-1">
                                    <View className="h-5 w-1 bg-[#16a085]"></View>
                                    <CustomText text="Opening Hours." bold className="text-xl" />
                                </View>
                            </View>
                            <View className="mt-2.5 pl-1">
                                {
                                    <CustomText text={isOpen ? "Open Now*" : "Closed Now*"}
                                                className={cn(isOpen ? "text-green-600" : "text-red-600", " text-base")}
                                                semibold/>
                                }
                            </View>
                            <View className="flex-row space-x-5 p-1">
                                <View className="space-y-0.5">
                                    {item.opening_hours.map(day => (
                                        <View key={day.id} className="space-x-4">
                                            <CustomText text={day.label} className="text-base"/>
                                        </View>
                                    ))}
                                </View>
                                <View className="space-y-0.5">
                                    {item.opening_hours.map(day => (
                                        <View key={day.id} className="flex-row items-center space-x-4">
                                            <CustomText text={day.open + ' - ' + day.close} className="text-base"
                                                        semibold/>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View className="absolute right-3.5 bottom-[180px] space-y-2.5">
                        <TouchableOpacity className="items-center justify-center">
                            <View className="bg-gray-50 rounded-full p-3.5" style={{
                                elevation: 2
                            }}>
                                <Ionicons name="call-outline" size={24} color="#0984e3"/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center justify-center">
                            <View className="bg-gray-50 rounded-full p-3.5" style={{
                                elevation: 2
                            }}>
                                <Ionicons name="logo-whatsapp" size={25} color="#00b894" />
                            </View>
                        </TouchableOpacity>
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
