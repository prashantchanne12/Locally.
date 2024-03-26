import {TouchableOpacity, View} from "react-native";
import {handleCall, handleWhatsApp} from "@/utils/utilities";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import CustomText from "@/app/components/CustomText";
import React from "react";

const ServiceCardFooter = ({contactNumbers, onPress}) => {
    return (
        <View className="flex-row items-center space-x-2">
            <TouchableOpacity onPress={() => handleCall(contactNumbers[0])}>
                <Ionicons name="call-outline" size={21} color="#0984e3"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleWhatsApp(contactNumbers[0])}>
                <FontAwesome6 name="whatsapp" size={22} color="#00b894"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <CustomText text="More details" semibold className="text-gray-600 text-xs"/>
            </TouchableOpacity>
        </View>
    )
}

export default ServiceCardFooter;