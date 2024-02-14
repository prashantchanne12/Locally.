import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NameAndLocation from "./app/pages/NameAndLocation";
import Operations from "./app/pages/Operations";
import PhotosAndDescription from "./app/pages/PhotosAndDescription";
import HomePage from "./app/pages/HomePage";
import { useFonts } from "expo-font";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import Signin from "./app/pages/Signin";

const Stack = createStackNavigator();

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId:
    "589088321812-4l6c29tvbg9nem4vftm3vdqgm5oqssbt.apps.googleusercontent.com",
});

const getHeaderStyles = () => {
  return {
    statusBarColor: "#2c3e50",
    headerTintColor: "#000",
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontWeight: undefined,
      fontFamily: "robo-b",
    },
  };
};

export default function App() {
  const [loaded, error] = useFonts({
    robo: require("./assets/fonts/RobotoSlab-Regular.ttf"),
    "robo-b": require("./assets/fonts/RobotoSlab-Bold.ttf"),
    "robo-sb": require("./assets/fonts/RobotoSlab-SemiBold.ttf"),
  });

  useEffect(() => {
    const isSignedIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      console.log(`Log in: ${isSignedIn}`);
    };
    isSignedIn();
  }, []);

  return (
    <HomePage />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShadowVisible: true,
    //       headerTitleStyle: {
    //         color: "#2c3e50",
    //       },
    //       headerStyle: {
    //         elevation: 10,
    //         shadowOpacity: 0,
    //         borderBottomWidth: 1,
    //         borderBottomColor: "rgba(0, 0, 0, 0.05)",
    //       },
    //     }}
    //   >
    //     <Stack.Screen
    //       name="New Service"
    //       component={Home}
    //       options={getHeaderStyles()}
    //     />
    //     <Stack.Screen
    //       name="New Service"
    //       component={NameAndLocation}
    //       options={getHeaderStyles()}
    //     />
    //     <Stack.Screen
    //       name="Operations"
    //       component={Operations}
    //       options={getHeaderStyles()}
    //     />
    //     <Stack.Screen
    //       name="Photos"
    //       component={PhotosAndDescription}
    //       options={getHeaderStyles()}
    //     />
    //     <Stack.Screen
    //       name="Signin"
    //       component={Signin}
    //       options={getHeaderStyles()}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
