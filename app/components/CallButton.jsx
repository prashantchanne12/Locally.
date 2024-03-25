import {TouchableOpacity, View} from "react-native";
import {handleCall} from "@/utils/utilities";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

const CallButton = ({contact_numbers}) => {
    return (
        <TouchableOpacity className="items-center justify-center"
                          onPress={() => handleCall(contact_numbers[0])}>
            <View className="bg-gray-50 rounded-full p-3.5" style={{
                elevation: 2
            }}>
                <Ionicons name="call-outline" size={24} color="#0984e3"/>
            </View>
        </TouchableOpacity>
    )
}

export default CallButton;