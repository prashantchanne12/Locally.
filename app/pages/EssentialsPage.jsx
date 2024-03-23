import {Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import React, {useEffect, useState} from "react";
import {supabase} from "@/utils/supabase";
import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import CustomText from "@/app/components/CustomText";
import {AntDesign, FontAwesome6, SimpleLineIcons} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {calculateDistance, cn, isServiceOpen} from "@/utils/utilities";
import {useLocationContext} from "@/app/contexts/LocationContext";

const EssentialsPage = ({route, navigation}) => {
    const {title} = route.params;
    const [essentials, setEssentials] = useState([]);

    useEffect(() => {
        const fethData = async () => {
            let { data: Services, error } = await supabase
                .from("Services")
                .select("*")
                .eq("is_essential", true)
                .eq("essential_type", title);
            setEssentials(Services);
        };

        fethData();

    }, []);
    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <Header title={title+'s'} goBack={true} goBackOnClick={() => navigation.goBack()}/>
                <ScrollView className="bg-[#fcfcfc] h-full px-3 ">
                    <View className="mt-3">
                        {
                            essentials.length ?
                                essentials.map(essential => (
                                    <EssentialCard key={essential.id} item={essential} navigation={navigation}/>)) :
                                <View>
                                    <CustomText text="Loading..."/>
                                </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const EssentialCard = ({item, navigation}) => {
    const { state, dispatch } = useLocationContext();
    const [isOpen, setIsOpen] = useState(null);

    useEffect(() => {
        setIsOpen(isServiceOpen(item.opening_hours));
    }, []);

    return (
       <View className="h-auto">
           <View className="px-3.5 pb-3 pt-1.5 border rounded-lg border-gray-300 relative">
               <View className="flex-row justify-between">
                   <View>
                       <CustomText text={item.name} bold className="text-2xl"/>
                   </View>
                   <View className="mt-1">
                       <View className="items-end flex-row space-x-1">
                           <View className="flex-row items-center space-x-1">
                               {isOpen ? (
                                   <AntDesign name="checkcircle" size={12} color="#16a085" />
                               ) : (
                                   <AntDesign name="closecircle" size={12} color="#c0392b" />
                               )}
                               <CustomText
                                   text={isOpen ? "Open" : "Closed"}
                                   semibold
                                   className={cn(isOpen ? "text-[#16a085]" : "text-[#c0392b]", "text-xs text-center")}
                               />
                           </View>
                           <View className="flex-row items-center space-x-0.5">
                               <SimpleLineIcons name="location-pin" size={15} color="gray" />
                               <CustomText text={calculateDistance(state.currentLocation, item.location)} className="text-xs text-gray-500" />
                           </View>
                       </View>
                   </View>
               </View>
               <View className="flex-row items-center gap-1 pt-[1px]">
                   <CustomText text={item.address[0]['address1'] + '.'} className="text-xs text-gray-500" />
                   <CustomText text={item.address[1]['address2'] + '.'} className="text-xs text-gray-500" />
               </View>
               <View className="mt-4 flex-row items-center space-x-4">
                   <View className="flex-row items-center">
                       <CustomText text="Monthly: " className="text-xs" />
                       <CustomText text={"₹"+item.average_price[0]} bold className=""/>
                   </View>
                   <View className="flex-row items-center">
                       <CustomText text="Annually: " className="text-xs"/>
                       <CustomText text={"₹"+item.average_price[2]} bold className=""/>
                   </View>
               </View>
               <View className="mt-4 flex-row items-center space-x-2 ">
                       <TouchableOpacity>
                           <Ionicons name="call-outline" size={21} color="#0984e3" />
                       </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome6 name="whatsapp" size={22} color="#00b894" />
                        </TouchableOpacity>
                       <TouchableOpacity onPress={() => {navigation.push("essentialDetails")}}>
                           <CustomText text="More details" semibold className="text-gray-600 text-xs" />
                       </TouchableOpacity>
               </View>

           </View>
       </View>
   )
}

export default EssentialsPage;