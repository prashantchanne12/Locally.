import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
import Services from "./Services";
import Signin from "./Signin";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Chats = () => {
  return (
    <View>
      <Text>Chats</Text>
    </View>
  );
};

const Home = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarActiveTintColor: "black",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "search-sharp" : "search-outline";
            } else if (route.name === "Chats") {
              iconName = focused ? "mail-sharp" : "mail-outline";
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Services} />
        <Tab.Screen name="Settings" component={Signin} />
        <Tab.Screen name="Chats" component={Chats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Home;
