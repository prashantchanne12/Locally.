import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import {LocationProvider} from '@/app/contexts/LocationContext';
import {router, Stack} from "expo-router";
import React from "react";
import {ToastAndroid, TouchableOpacity} from "react-native";
import userStore from "@/app/strore/userStore";


GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
        "589088321812-4l6c29tvbg9nem4vftm3vdqgm5oqssbt.apps.googleusercontent.com",
});

const InitialLayout = () => {
    const deleteUser = userStore((state) => state.deleteUser);
    const user = userStore((state) => state.user);


    const [loaded, error] = useFonts({
        product: require("@/assets/fonts/ProductSans-Regular.ttf"),
        "product-sb": require("@/assets/fonts/ProductSans-Medium.ttf"),
        "product-b": require("@/assets/fonts/ProductSans-Bold.ttf"),
    });

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            deleteUser();
            router.replace("");
        } catch (error) {
            console.error(error);
            ToastAndroid.show('Error logging out!',
                ToastAndroid.LONG);
        }
    };

    useEffect(() => {
        const isSignedIn = async () => {
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (!isSignedIn){
                router.replace("");
            }else{
                router.replace("/(tabs)/home")
            }
        };

        isSignedIn();
    }, []);


    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false,
                statusBarStyle: "dark",
            }} />
            <Stack.Screen name="(tabs)" options={{
                headerShown: false,
                statusBarStyle: "dark" }} />
        </Stack>
    )
}

export default InitialLayout;