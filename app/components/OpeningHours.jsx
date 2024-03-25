import {View} from "react-native";
import CustomText from "@/app/components/CustomText";
import {cn} from "@/utils/utilities";
import React from "react";

const OpeningHours = ({item, isOpen}) => {
    return (
        <View className="px-3.5 mt-3.5 mb-44">
            <View>
                <View className="flex-row items-center space-x-1">
                    <View className="h-5 w-1 bg-[#16a085]"></View>
                    <CustomText text="Opening Hours." bold className="text-lg"/>
                </View>
            </View>
            <View className="mt-2.5 pl-1">
                {
                    <CustomText text={isOpen ? "Open Now*" : "Closed Now*"}
                                className={cn(isOpen ? "text-green-600" : "text-red-600", "")}
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
                    {item.opening_hours.map(day => {
                        return (
                            <View key={day.id} className="flex-row items-center space-x-4">
                                {
                                    !day.isClosed ?
                                        <CustomText text={day.open + ' - ' + day.close} className="text-base"
                                                    semibold/> :
                                        <CustomText text="Closed" className="text-base text-red-600" semibold/>
                                }
                            </View>
                        )

                    })}
                </View>
            </View>
        </View>
    )
}

export default OpeningHours;