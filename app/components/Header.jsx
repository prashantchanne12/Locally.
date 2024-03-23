import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import {cn} from "@/utils/utilities";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import CustomText from "@/app/components/CustomText";

const Header = ({title, goBack= false, goBackOnClick, small=false}) => {
    return (
        <View>
            <View className={cn("pt-2 pb-1.5 gap-1 border-b border-gray-200 bg-white z-40 flex-row items-center",
                goBack ? "pl-2" : "pl-4")}
                  style={{elevation: 1}}>
                {goBack && <MaterialIcons onPress={goBackOnClick} name="arrow-back-ios-new" size={24} color="black" />}
                <View>
                    <CustomText text={title} className={cn(small ? "text-xl" : "text-2xl", "p-1")} bold />
                </View>
            </View>
        </View>
    )
}

export default Header;