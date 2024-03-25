import {TouchableOpacity, View} from "react-native";
import {handleWhatsApp} from "@/utils/utilities";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

const WhatsappButton = ({contact_numbers}) => {
    return (
        <TouchableOpacity className="items-center justify-center"
                          onPress={() => handleWhatsApp(contact_numbers[0])}>
            <View className="bg-gray-50 rounded-full p-3.5" style={{
                elevation: 2
            }}>
                <Ionicons name="logo-whatsapp" size={25} color="#00b894"/>
            </View>
        </TouchableOpacity>
    )
}

export default WhatsappButton