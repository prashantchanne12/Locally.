import {View} from "react-native";
import CustomText from "@/app/components/CustomText";
import {cn, getType} from "@/utils/utilities";
import React from "react";

const Tags = ({item, small}) => {
    const styles = cn(small ? "text-xs px-2 py-1" : "text-[13px] px-2.5 py-1.5")
    return (
        <View className={cn("flex-row items-center", item.is_essential && "space-x-2")}>
            <View>
                {
                    item.is_essential ?
                        <View className="bg-gray-50 border border-gray-500 rounded z-50" style={{elevation: 1}} key={0}>
                            <CustomText text={item.essential_type} bold className={styles}/>
                        </View>
                        : <></>
                }
            </View>
            <View className="flex-row space-x-2 py-1">
                {
                    item.types.map((type, index) => (
                        <View key={index + 1} className="bg-gray-50 border border-gray-500 rounded z-50" style={{elevation: 1}}>
                            <CustomText text={getType(type)} bold className={styles}/>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default Tags;