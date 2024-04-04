import {cn} from "@/utils/utilities";
import {View} from "react-native";
import CustomText from "@/app/components/CustomText";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import Tags from "@/app/components/Tags";
import ServiceCardFooter from "@/app/components/ServiceCardFooter";
import React from "react";

const ServiceCardCompact = ({service, isOpen, howFar, onPress}) => {

    return (
        <View className="pt-2">
            <View className="mb-1 px-3">
                <View className="flex-row justify-between items-start">
                    <View>
                        {/* NAME  */}
                        <CustomText text={service.name} bold className={cn("text-base")}/>

                        {/* ADDRESS */}
                        <View>
                            <View className="flex-row items-center gap-1">
                                <CustomText text={service.address[0]['address1'] + '.'} className="text-xs text-gray-500"/>
                                {service.address[1] ?
                                    <CustomText text={service.address[1]['address2'] + '.'}
                                                className="text-xs text-gray-500"/> : <></>}
                            </View>
                        </View>
                    </View>

                    {/* ICONS */}
                    <View className="items-start mt-0.5">
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
            </View>

            {/* DESCRIPTION */}
            <View className="px-[10px] mt-1.5">
                <CustomText text={service.desc} className="text-gray-500"/>
            </View>

            {/* TAGS */}
            <View className="px-3 mt-3">
                <Tags item={service} small/>
            </View>

            {/* FOOTER */}
            <View className="px-3 mt-3 pb-2.5">
                <ServiceCardFooter contactNumbers={service.contact_numbers} onPress={onPress}/>
            </View>

        </View>
    )
}

export default ServiceCardCompact