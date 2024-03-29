import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import {TextInput, View} from "react-native";
import { Feather } from '@expo/vector-icons';
import { supabase } from "@/utils/supabase";
import CustomText from "@/app/components/CustomText";

const SearchPage = () => {

    const [searchResults, setSearchResults] = useState([]);

    const searchServices = async (searchText, searchType) => {
        if(searchText.length){
            const searchTerm = `%${searchText}%`;
            const { data, error } = await supabase
                .from('Services')
                .select('*')
                .or(`name.ilike.${searchTerm}`, `desc.ilike.${searchTerm}`)

            if (error) {
                console.error('Error fetching items:', error.message);
                return [];
            }

            setSearchResults(data);
        }else{
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
                        />
                        <View className="absolute top-2.5 left-2">
                            <Feather name="search" size={22} color="#2d3436" />
                        </View>
                        <View>
                            {searchResults.length ? <View>
                                {
                                    searchResults.map(item => (
                                        <View key={item.id}>
                                            <CustomText text={item.name}/>
                                        </View>
                                    ))
                                }
                            </View> : <></>}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default SearchPage;