import {StyleSheet, View} from "react-native";
import CustomText from "@/app/components/CustomText";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import {cn} from "@/utils/utilities";
import React from "react";
import PagerView from "react-native-pager-view";
import {Image} from "expo-image";
import { Ionicons } from '@expo/vector-icons';

const DetailsHeader = ({item, isOpen}) => {
    return (
        <View>
            <View className="mt-3.5 px-3.5">
                <View className="flex-row justify-between items-center">
                    <View>
                        <CustomText text={item.name} bold className="text-2xl text-[#14947b]"/>
                        <View className="flex-row items-center">
                            <CustomText text={item.address[0]['address1'] + '.'} className="text-[13px]"/>
                        </View>
                    </View>
                    <View className="mt-1">
                        <View className="mt-0">
                            <View>
                                <CustomText text="Home delivery" semibold
                                            className="text-right"/>
                            </View>
                        </View>
                        <View className="items-end justify-end flex-row space-x-1 mt-[3px] ">
                            <View className="flex-row items-center space-x-1">
                                {isOpen ? (
                                    <AntDesign name="checkcircle" size={12} color="#16a085"/>
                                ) : (
                                    <AntDesign name="closecircle" size={12} color="#c0392b"/>
                                )}
                                <CustomText
                                    text={isOpen ? "Open" : "Closed"}
                                    semibold
                                    className={cn(isOpen ? "text-[#16a085]" : "text-[#c0392b]", "text-xs text-center")}
                                />
                            </View>
                            <View className="flex-row items-center space-x-0.5">
                                <SimpleLineIcons name="location-pin" size={15} color="gray"/>
                                <CustomText text={item.howFar} className="text-xs text-gray-500"/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, height: 200 }} className="mt-3.5 px-3.5">
                <PagerView style={styles.viewPager} initialPage={0}>
                    {
                        item.photos.map((image, index) => (
                            <View key={index} className="rounded bg-white z-[1000]" style={{elevation: 5}}>
                                <Image
                                    source={image}
                                    className="w-full h-full object-contain rounded bg-white" />
                            </View>
                        ))
                    }
                </PagerView>
            </View>
            <View className="px-3.5 mt-2.5">
                <CustomText text={item.desc} className="text-justify text-[15px]" />
            </View>
        </View>
    )
}

export default DetailsHeader;

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
