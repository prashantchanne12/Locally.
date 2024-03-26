import {View} from "react-native";
import CustomText from "@/app/components/CustomText";
import React from "react";

const PriceTable = ({prices}) => {
   return (
       <View className="flex-row space-x-5">
           <View className="space-y-0.5">
               {prices.map(item => (
                   <View key={item.label}>
                       <CustomText text={item.label} className="text-base"/>
                   </View>
               ))}
           </View>
           <View className="h-full w-[1px] bg-gray-200"></View>
           <View className="space-y-0.5">
               {prices.map((item, index) => (
                   <View key={index}>
                       <CustomText text={'₹ '+item.value} className="text-base" semibold/>
                   </View>
               ))}
           </View>
       </View>
   )
}

export default PriceTable;