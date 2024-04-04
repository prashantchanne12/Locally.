import {View} from "react-native";
import CustomText from "@/app/components/CustomText";
import {Image} from "expo-image";
import React from "react";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import {cn} from "@/utils/utilities";

const ServiceCard = ({service, isOpen, howFar}) => {
    const getAddress = () => {
        const addr = service.address
        let finalAddress = addr[0]['address1'] + '. ';

        if (addr[1]) {
            finalAddress += addr[1]['address2'] + '.'
        }
        return finalAddress
    }

    return (
        <View className="flex-row py-3.5 px-3 gap-4">
            <View>
                <Image
                    source={service.photos[0]}
                    className="h-[120px] w-[120px] bg-cover rounded"
                    contentFit="cover"
                />
            </View>
            <View className="flex-1  space-y-2.5">
                <View>
                    <View>
                        <View>
                            <CustomText text={service.name} bold className="text-base"/>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <CustomText text={getAddress()} className="text-xs text-gray-500" />
                        </View>
                    </View>
                    <View className="items-start mt-2">
                        <View className="items-end flex-row space-x-1">
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
                                <CustomText text={howFar} className="text-xs text-gray-500"/>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <CustomText text={service.desc} lines={2} className="text-gray-500"/>
                </View>
            </View>
        </View>
    )
}

export default ServiceCard;