import CustomText from "@/app/components/CustomText";
import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import {TextInput, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {calculateDistance, cn, isServiceOpen} from "@/utils/utilities";
import ServiceCardCompact from "@/app/components/ServiceCardCompact";
import CompactServiceSkeleton from "@/app/components/skeletons/CompactServiceSkeleton";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {supabase} from "@/utils/supabase";
import locationStore from "@/app/strore/locationStore";
import {router} from "expo-router";

const Search = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isCursorActive, setIsCursorActive] = useState(false);
    const globalCurrentLocation = locationStore((state) => state.globalCurrentLocation)

    const searchServices = async (searchText, searchType) => {
        setSearchText(searchText)
        if(searchText.length){
            setLoading(true);
            const searchTerm = `%${searchText}%`;
            const { data, error } = await supabase
                .from('Services')
                .select('*')
                .or(`name.ilike.${searchTerm}`, `desc.ilike.${searchTerm}`)

            if (error) {
                console.error('Error fetching items:', error.message);
                setLoading(false);
                setSearchResults([]);
            }

            setLoading(false);
            setSearchResults(data);
        }else{
            setLoading(false);
            setSearchResults([]);
        }
    };

    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <ScrollView className="bg-[#fcfcfc] h-full">
                    <View className="relative ">
                        <View className="bg-white pb-2.5 px-5" style={{
                            elevation: 2,
                        }}>
                            <TextInput
                                selectionColor="black"
                                className="border border-gray-200 py-1 pl-9 rounded-md "
                                placeholder="Search a service."

                                onChangeText={(e) => searchServices(e)}
                                onFocus={() => setIsCursorActive(true)}
                                onBlur={() => setIsCursorActive(false)}
                            />
                        </View>
                        <View className="absolute top-[10px] left-[30px]">
                            <Feather name="search" size={18} color="#ccc" />
                        </View>

                        {
                            !searchResults.length && !searchText.length ?
                                <View className={cn("items-center justify-center", isCursorActive ? "h-[250px]" : "h-[450px]")}>
                                    <CustomText text="Search something interesting...🫣" className="text-lg text-gray-400"
                                                semibold/>
                                </View>
                                : <></>
                        }

                        {
                            !searchResults.length && searchText.length && !loading ?
                                <View className={cn("items-center justify-center", isCursorActive ? "h-[250px]" : "h-[450px]")}>
                                    <CustomText text="Not Found 💀" className="text-lg text-gray-400" semibold />
                                </View>
                                : <></>
                        }

                        <View className="px-3">

                        </View>
                        {!loading ? <View className="px-3.5">
                            {
                                searchResults.map(service => {

                                    const isOpen = isServiceOpen(service.opening_hours);
                                    const howFar = calculateDistance(globalCurrentLocation, service.location);
                                    const newService = {...service, isOpen, howFar}
                                    return (
                                        <View
                                            key={service.id}
                                            className="border bg-white border-gray-200 border-b-0 my-2 relative rounded-lg"
                                            style={{
                                                elevation: 2,
                                            }}
                                        >
                                            <View>
                                                <ServiceCardCompact
                                                    service={newService}
                                                    onPress={() => {
                                                        router.push({
                                                            pathname: "/search/details",
                                                            params: {service: JSON.stringify(newService)},
                                                        });
                                                    }} />
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View> : <View className="px-3">
                            {CompactServiceSkeleton(1)}
                        </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Search;