import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
import Services from "./Services";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import ServicePage from "./ServicePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Chats = () => {
  return (
    <View>
      <Text>Chats</Text>
    </View>
  );
};

const Settings = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

const Home = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Services} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Chats" component={Chats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Home;
