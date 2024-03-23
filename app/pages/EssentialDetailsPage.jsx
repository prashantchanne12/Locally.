import CustomText from "@/app/components/CustomText";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import React from "react";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import {calculateDistance, cn, getType} from "@/utils/utilities";
import PagerView from 'react-native-pager-view';
import { StyleSheet, View, Text } from 'react-native';
import {Image} from "expo-image";

const EssentialDetailsPage = ({route, navigation}) => {
    const {item} = route.params;
    const isOpen = true;
    const howFar = "100m"
    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <Header title={item.name} goBack={true} goBackOnClick={() => {navigation.goBack()}} />
                <View>
                    <ScrollView className="bg-[#fcfcfc] h-full">
                        <View className="mt-3.5 px-3.5">
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <CustomText text={item.name} bold className="text-2xl"/>
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
                            <View className="flex-row items-center space-x-1">
                                <View className="h-5 w-1 bg-[#16a085]"></View>
                                <CustomText text="Prices" bold className="text-xl" />
                            </View>
                        </View>
                    </ScrollView>
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
