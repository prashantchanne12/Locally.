import {Pressable, View, ToastAndroid} from "react-native";
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/app/components/CustomText";
import { AntDesign } from '@expo/vector-icons';
import {cn} from "@/utils/utilities";
import {PRIMARY} from "@/utils/constants";
import userStore from "@/app/strore/userStore";
import {router} from "expo-router";

const SignInPage = () => {

    const setUser = userStore((state) => state.setUser);

    return (
        <SafeAreaView className={"bg-gray-100 h-full"}>
            <View>
                <View className="bg-white" style={{
                    elevation: 2,
                }}>
                    <View className="p-5">
                        <CustomText text="Locally." bold primary className={"text-4xl"}/>
                        <CustomText text="Search Nearby Services." semibold className={"text-base"} />
                    </View>
                </View>
                <View className="items-center mt-10" >
                    <CustomText text="Please sign in to continue." className="text-base text-gray-500" />
                    <View className="mt-2">
                        <Pressable onPress={async () => {
                            try {
                                await GoogleSignin.hasPlayServices();
                                const userInfo = await GoogleSignin.signIn();
                                // console.log(JSON.stringify(userInfo, null, 2));
                                if (userInfo.idToken) {
                                    const {data, error} = await supabase.auth.signInWithIdToken(
                                        {
                                            provider: "google",
                                            token: userInfo.idToken,
                                        }
                                    );
                                    if(!error){
                                        setUser(userInfo);
                                        router.replace("/(tabs)");
                                    } else {
                                        ToastAndroid.show('Error while signing in! Try again later',
                                            ToastAndroid.LONG);
                                    }
                                } else {
                                    throw new Error("no ID token present!");
                                }
                            } catch (error) {
                                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                                    // user cancelled the login flow
                                } else if (error.code === statusCodes.IN_PROGRESS) {
                                    // operation (e.g. sign in) is in progress already
                                } else if (
                                    error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                                ) {
                                    // play services not available or outdated
                                } else {
                                    // some other error happened
                                    console.log("Something went wrong: ", error);
                                }
                            }
                        }}>
                            <View
                                className={cn("flex-row items-center border space-x-2 w-full px-16 py-2.5 rounded-md", `bg-[${PRIMARY}]`, )}>
                                <AntDesign name="google" size={24} color="white" />
                                <CustomText text="Sign in with Google." semibold className="text-base text-white" />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignInPage;