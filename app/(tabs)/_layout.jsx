import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const TabLayout = () => {
    return (
        <GestureHandlerRootView>
            <Tabs>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({size, color}) => (
                            <Ionicons name="home-sharp" size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        tabBarIcon: ({size, color}) => (
                            <Ionicons name="search-sharp" size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        title: "Chat",
                        tabBarIcon: ({size, color}) => (
                            <Ionicons name="mail-sharp" size={size} color={color} />
                        )
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    )
}

export default TabLayout;