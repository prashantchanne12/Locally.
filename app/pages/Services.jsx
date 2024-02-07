import * as React from "react";
import {
  Animated,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import CustomText from "../components/CustomText";
import { PRIMARY } from "@/utils/constants";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const FirstRoute = () => (
  <View className="bg-white h-full">
    <StatusBar style="dark" />
    <CustomText text="First" bold />
  </View>
);

const SecondRoute = () => (
  <View>
    <StatusBar style="dark" />
    <CustomText text="Second" bold />
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  const renderTabBar = ({ navigationState }) => {
    const { index } = navigationState;
    return (
      <SafeAreaView className="pt-2 px-5 bg-white">
        <View>
          <CustomText text="ServiceX" className="text-2xl" bold />
        </View>
        <View className="flex-row space-x-4 mt-3">
          {navigationState.routes.map((route, i) => {
            const isSelected = i === index;
            return (
              <TouchableOpacity onPress={() => setIndex(i)} key={route.title}>
                <View
                  className={`${
                    isSelected
                      ? `bg-[${PRIMARY}]`
                      : "bg-gray-200 border border-gray-200"
                  } px-5 py-2`}
                >
                  <CustomText
                    text={route.title}
                    semibold
                    className={isSelected ? "text-white" : "text-black"}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
