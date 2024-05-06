import {FlatList, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import {supabase} from "@/utils/supabase";
import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import CustomText from "@/app/components/CustomText";
import {AntDesign, FontAwesome6, SimpleLineIcons} from '@expo/vector-icons';
import {calculateDistance, cn, handleCall, handleWhatsApp, isServiceOpen} from "@/utils/utilities";
import ServiceCardFooter from "@/app/components/ServiceCardFooter";
import CompactServiceSkeleton from "@/app/components/skeletons/CompactServiceSkeleton";
import {router, Stack, useLocalSearchParams} from "expo-router";
import locationStore from "@/app/strore/locationStore";

const EssentialsPage = () => {
    const {title} = useLocalSearchParams();
    const [essentials, setEssentials] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fethData = async () => {
            let { data: Services, error } = await supabase
                .from("Services")
                .select("*")
                .eq("is_essential", true)
                .eq("essential_type", title);

            setLoading(false)
            setEssentials(Services);
        };

        setLoading(true)
        fethData();

    }, []);
    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <Stack.Screen
                    options={{
                        headerTitle: title + ".",
                        headerTitleStyle: {
                            fontFamily: "product-b"
                        }
                    }}
                />
                <ScrollView className="bg-[#fcfcfc] h-full px-3 ">
                    <View className="mt-3">
                        {
                            loading ?
                                <View>
                                    {CompactServiceSkeleton(2)}
                                </View>

                                : essentials.length ?
                                    <FlatList
                                        scrollEnabled={false}
                                        keyExtractor={(item) => item.id}
                                        data={essentials}
                                        renderItem={({item}) => {
                                        return <EssentialCard item={item} />
                                    }} /> :
                                    <View>
                                        <CustomText text={`No ${title} found!`} />
                                    </View>

                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const EssentialCard = ({item}) => {
    const isOpen = isServiceOpen(item.opening_hours)
    const globalCurrentLocation = locationStore((state) => state.globalCurrentLocation)
    const howFar = calculateDistance(globalCurrentLocation, item.location);
    const jsonItem = JSON.stringify({...item, isOpen, howFar});
    return (
        <View className="h-auto">
            <View className="mx-1 mt-1 px-3.5 pb-3 pt-1.5 rounded-lg mb-0.5 bg-white relative" style={{elevation: 2}}>
                <View className="flex-row justify-between">
                    <TouchableOpacity onPress={() => {
                        router.push({pathname: "/home/details", params: {service: jsonItem}})
                    }}>
                        <CustomText text={item.name} bold className="text-xl"/>
                    </TouchableOpacity>
                    <View className="mt-1">
                        <View className="items-end flex-row space-x-1">
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
                                <CustomText text={howFar} className="text-xs text-gray-500" />
                            </View>
                        </View>
                    </View>
                </View>
                <View className="flex-row items-center gap-1 pt-[1px]">
                    <CustomText text={item.address[0]['address1'] + '.'} className="text-xs text-gray-500" />
                    <CustomText text={item.address[1]['address2'] + '.'} className="text-xs text-gray-500" />
                </View>
                <View className="mt-4 flex-row items-center space-x-4">
                    <View className="flex-row items-center">
                        <CustomText text={item.price_table[0].label+": "} className="text-xs" />
                        <CustomText text={"₹"+item.price_table[0].value} bold className=""/>
                    </View>
                    {
                        item.price_table.length > 1 ?
                            <View className="flex-row items-center">
                                <CustomText text={item.price_table[item.price_table.length - 1].label+": "} className="text-xs"/>
                                <CustomText text={"₹"+item.price_table[item.price_table.length - 1].value} bold className=""/>
                            </View>
                            : <></>
                    }
                </View>
                <View className="mt-4">
                    <ServiceCardFooter contactNumbers={item.contact_numbers} onPress={() => {
                        router.push({pathname: "/home/details", params: {service: jsonItem}})
                    }} />
                </View>

            </View>
        </View>
    )
}

export default EssentialsPage;