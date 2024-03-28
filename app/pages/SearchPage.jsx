import {GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import {TextInput, View} from "react-native";
import { Feather } from '@expo/vector-icons';

const SearchPage = () => {
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
                        />
                        <View className="absolute top-2.5 left-2">
                            <Feather name="search" size={22} color="#2d3436" />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default SearchPage;