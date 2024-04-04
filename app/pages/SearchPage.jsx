import {GestureHandlerRootView, ScrollView, TouchableWithoutFeedback} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import {Text, TextInput, View} from "react-native";
import { Feather } from '@expo/vector-icons';
import { supabase } from "@/utils/supabase";
import CustomText from "@/app/components/CustomText";
import {calculateDistance, cn, isServiceOpen} from "@/utils/utilities";
import {useLocationContext} from "@/app/contexts/LocationContext";
import CompactServiceSkeleton from "@/app/components/skeletons/CompactServiceSkeleton";
import ServiceCardCompact from "@/app/components/ServiceCardCompact";

const SearchPage = ({navigation}) => {
    const { state, dispatch } = useLocationContext();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isCursorActive, setIsCursorActive] = useState(false);

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
            <StatusBar style="light" backgroundColor="black" />
            <SafeAreaView>
                <Header title="Search." />
                <ScrollView className="bg-[#fcfcfc] h-full px-3 ">
                    <View className="mt-3 relative">
                        <TextInput
                            selectionColor="black"
                            className="border border-gray-500 p-1.5 pl-9 rounded"
                            placeholder="Search a service."
                            onChangeText={(e) => searchServices(e)}
                            onFocus={() => setIsCursorActive(true)}
                            onBlur={() => setIsCursorActive(false)}
                        />
                        <View className="absolute top-2.5 left-2">
                            <Feather name="search" size={22} color="#2d3436" />
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

                            {!loading ? <View>
                                {
                                    searchResults.map(service => {

                                        const isOpen = isServiceOpen(service.opening_hours);
                                        const howFar = calculateDistance(state.currentLocation, service.location);

                                        return (
                                            <View
                                                key={service.id}
                                                className="border bg-white border-gray-200 border-b-0 pt-2 my-2  relative rounded-lg"
                                                style={{
                                                    elevation: 2,
                                                }}
                                            >
                                                <View>
                                                    <ServiceCardCompact
                                                        service={service}
                                                        isOpen={isOpen}
                                                        howFar={howFar}
                                                        onPress={() => {
                                                        navigation.navigate("service", {service: {...service, isOpen, howFar}});
                                                    }} />
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View> : <View>
                                {CompactServiceSkeleton(1)}
                            </View>
                            }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default SearchPage;