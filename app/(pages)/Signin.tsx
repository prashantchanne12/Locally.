import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

const Signin = () => {
  return (
    <SafeAreaView>
      <View className="p-5 h-4/5 justify-center items-center">
        <View className="items-center">
          <Text className="font-['mukta-b'] text-4xl pt-3 text-[#16a085]">
            StoreX
          </Text>
          <Text className="text-sm -mt-3 text-gray-500">
            Please login to continue
          </Text>
        </View>
        <View className="mt-5">
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
              try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                console.log(JSON.stringify(userInfo, null, 2));
                if (userInfo.idToken) {
                  console.log("signing in...");
                  const { data, error } = await supabase.auth.signInWithIdToken(
                    {
                      provider: "google",
                      token: userInfo.idToken,
                    }
                  );
                  console.log(error, data);
                } else {
                  throw new Error("no ID token present!");
                }
              } catch (error: any) {
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
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
