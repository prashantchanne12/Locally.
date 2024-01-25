import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import React from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(pages)/Signin",
};

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId:
    "589088321812-4l6c29tvbg9nem4vftm3vdqgm5oqssbt.apps.googleusercontent.com",
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mukta: require("../assets/fonts/Mukta-Regular.ttf"),
    "mukta-b": require("../assets/fonts/Mukta-Bold.ttf"),
    "mukta-sb": require("../assets/fonts/Mukta-SemiBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const isSignedIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      console.log(`Log in: ${isSignedIn}`);
    };
    isSignedIn();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    console.log("Not Loading....");
    console.log("Not Loading....");
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="(pages)/NameAndLocation"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
