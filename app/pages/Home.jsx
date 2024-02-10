import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
import Services from "./Services";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import MapsPage from "./MapsPage";

const Chats = () => {
  return (
    <View>
      <Text>Chats</Text>
    </View>
  );
};

const Search = () => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

const Home = () => {
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
            } else if (route.name === "Search") {
              iconName = focused ? "search-sharp" : "search-outline";
            } else if (route.name === "Chats") {
              iconName = focused ? "mail-sharp" : "mail-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map-sharp" : "map-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Services} />
        <Tab.Screen name="Map" component={MapsPage} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Chats" component={Chats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Home;
