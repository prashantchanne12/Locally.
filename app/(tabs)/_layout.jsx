import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {PRIMARY} from "@/utils/constants";

const TabLayout = () => {
    return (
        <GestureHandlerRootView>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: PRIMARY,
                    tabBarShowLabel: false,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({size, color, focused}) => (
                            <Ionicons name={focused ? "home-sharp" : "home-outline"} size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        headerShown: false,
                        tabBarIcon: ({size, color, focused}) => (
                            <Ionicons name={focused ? "search-sharp" : "search-outline"} size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        title: "Chat",
                        tabBarIcon: ({size, color, focused}) => (
                            <Ionicons name={focused ? "mail-sharp" : "mail-outline"} size={size} color={color} />
                        )
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    )
}

export default TabLayout;