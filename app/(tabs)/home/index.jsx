import CustomText from "@/app/components/CustomText";
import {GestureHandlerRootView, ScrollView, TouchableWithoutFeedback} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {router, Stack} from "expo-router";
import React, {useEffect, useState} from "react";
import {calculateDistance, cn, getCurrentLocation, isServiceOpen} from "@/utils/utilities";
import {Dimensions, FlatList, TouchableOpacity, View} from "react-native";
import {FontAwesome, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import ServiceCardCompact from "@/app/components/ServiceCardCompact";
import ServiceCard from "@/app/components/ServiceCard";
import CompactServiceSkeleton from "@/app/components/skeletons/CompactServiceSkeleton";
import {supabase} from "@/utils/supabase";
import locationStore from "@/app/strore/locationStore";

const Home = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                let {data: Services, error} = await supabase
                    .from("Services")
                    .select("*");
                setServices(Services);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log("Error fetching services: ", err);
            }

        };

        fetchData();
    }, []);

    return (
        <GestureHandlerRootView>
            <Stack.Screen
                options={{
                    headerTitle: "Locally.",
                    headerTitleStyle: {
                        fontFamily: "product-b",
                    }
                }}
            />
            <SafeAreaView>
                <ScrollView className="bg-gray-50 h-full px-3 ">
                    <Essentials />
                    <Explore services={services} loading={loading}  />
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Home;

const Explore = ({ services = [], loading}) => {

    const [currentLocation, setCurrentLocation] = useState({});
    const [compact, setCompact] = useState(true);
    const setGlobalCurrentLocation = locationStore((state) => state.setGlobalCurrentLocation)

    useEffect(() => {
        (async () => {
            const location = await getCurrentLocation();
            const newLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
            setCurrentLocation(newLocation);
            setGlobalCurrentLocation(newLocation);
        })();
    }, []);


    return (
        <View className="mt-3">
            <View className="py-1.5">
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center space-x-1">
                        <View className="h-5 w-1 ml-1 bg-[#16a085]"></View>
                        <CustomText text="Nearby Services." bold className="text-lg" />
                    </View>
                    <View className="flex-row items-center mr-1">
                        <TouchableOpacity onPress={() => setCompact(true)}
                                          className={cn("px-2 py-0.5", compact ? "bg-white" : "bg-gray-200", "rounded-tl rounded-bl")}
                                          style={{elevation: compact ? 2 : 1}}>
                            <MaterialCommunityIcons name="reorder-horizontal" size={22} color={compact ? "black" : "gray"}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCompact(false)}
                                          className={cn("px-2 py-0.5", !compact ? "bg-white" : "bg-gray-200", "rounded-tr rounded-br")}
                                          style={{elevation: !compact ? 2 : 1}}>
                            <MaterialCommunityIcons name="cards-variant" size={22} color={!compact ? "black" : "gray"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="">
                {
                    !loading ?
                        services.length ?
                            <FlatList
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id}
                                data={services}
                                renderItem={({item}) => {
                                    const isOpen = isServiceOpen(item.opening_hours);
                                    const howFar = calculateDistance(currentLocation, item.location);
                                    const nonJsonItem = {...item, isOpen, howFar}
                                    const newItem = JSON.stringify(nonJsonItem);
                                    const onCompactPress = () => {
                                        router.push({
                                            pathname: "/home/details",
                                            params: {service: newItem},
                                        });
                                    }

                                    return (
                                        <TouchableWithoutFeedback
                                            className="mx-1 bg-white my-2 relative rounded-lg"
                                            onPress={!compact ? onCompactPress : null}
                                            style={{
                                                elevation: 2,
                                            }}
                                        >
                                            {
                                                compact ?
                                                    <ServiceCardCompact
                                                        service={nonJsonItem}
                                                        onPress={onCompactPress}
                                                    />
                                                    : <ServiceCard
                                                        service={nonJsonItem}
                                                    />
                                            }
                                        </TouchableWithoutFeedback>

                                    )
                                }}/> :
                            <View>
                                <CustomText text="Nearby services not available" bold className="text-base"/>
                            </View> : CompactServiceSkeleton(3)
                }
            </View>
        </View>
    );
};

const Essentials = () => {
    const width = Dimensions.get("window").width;
    return (
        <View className="mt-3.5">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View className="flex-row gap-2.5 pl-2 py-1" >
                    <TouchableOpacity
                        onPress={() => {
                            router.push({pathname: "/home/essentials", params: {title: "Doodhwala"}});
                        }}
                        className="items-center justify-center p-3 rounded-lg w-[100px] h-[100px] bg-white"
                        style={{elevation: 2,}}>
                        <MaterialIcons name="local-drink" size={48} color="#0984e3"/>
                        <CustomText text="Dhoodhwala" className="text-xs pt-[6px] text-gray-500" semibold/>
                    </TouchableOpacity>
                    <View className="items-center justify-center p-3 rounded-lg w-[100px] h-[100px] bg-white" style={{elevation: 2,}}>
                        <FontAwesome name="wifi" size={47} color="#00b894" />
                        <CustomText text="Internet" className="text-xs pt-1 text-gray-500" semibold  />
                    </View>
                    <View className="items-center justify-center p-3 rounded-lg  w-[100px] h-[100px] bg-white" style={{elevation: 2,}}>
                        <MaterialCommunityIcons name="weight-lifter" size={48} color="#d63031" />
                        <CustomText text="Gyms" className="text-xs pt-0.5 text-gray-500" semibold  />
                    </View>
                    <View className="items-center justify-center p-3 rounded-lg w-[100px] h-[100px] bg-white" style={{elevation: 2,}}>
                        <MaterialCommunityIcons name="lightning-bolt" size={48} color="#f1c40f" />
                        <CustomText text="Electrician" className="text-xs pt-0.5 text-gray-500"  semibold />
                    </View>
                    {/*<MaterialIcons name="carpenter" size={24} color="black" />*/}
                </View>
            </ScrollView>
        </View>
    );
};