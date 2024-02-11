import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import CustomText from "../components/CustomText";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { supabase } from "@/utils/supabase";
import { PRIMARY } from "@/utils/constants";
import * as Location from "expo-location";
import Card from "../components/Card";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / 300;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapsPage = () => {
  const [services, setServices] = useState([]);
  const [places, setPlaces] = useState([]);
  const [placesLocation, setPlacesLocation] = useState(null);
  const [location, setLocation] = useState({
    coords: {
      latitude: 19.050079,
      longitude: 72.869431,
    },
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fethData = async () => {
      let { data: Services, error } = await supabase
        .from("Services")
        .select("*");

      setServices(Services);
    };

    fethData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setPlacesLocation(location);
      //   console.log(location);
      //   console.log(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    if (placesLocation) {
      fetchNearbyPlaces(
        placesLocation.coords.latitude,
        placesLocation.coords.longitude
      );
    }
  }, [placesLocation]);

  const fetchNearbyPlaces = async (lat, lng) => {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    const radius = 5000; // in meters
    const url = "https://places.googleapis.com/v1/places:searchNearby";
    const info = {
      includedTypes: ["cafe"],
      maxResultCount: 1,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: radius,
        },
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.displayName,places.rating,places.location,places.formattedAddress,places.nationalPhoneNumber,places.regularOpeningHours,places.primaryType,places.shortFormattedAddress,places.photos,places.reviews,places.iconMaskBaseUri,places.iconBackgroundColor",
        "X-Android-Package": "com.channe.storex",
        "X-Android-Cert":
          "5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25",
      },
      body: JSON.stringify(info),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setPlaces(data.places);
      // console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
          <View className="py-2 px-5">
            <CustomText text="What's near me" className="text-xl" bold />
            <View>
              <View className="h-[300px] w-full mt-2">
                {/* <MapView
                  provider={PROVIDER_GOOGLE}
                  className="w-full h-full"
                  showsUserLocation={true}
                  initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    title="Your Location"
                    description="You are here"
                  />
                  {services.map((service) => (
                    <Marker
                      key={service.id}
                      pinColor="#d35400"
                      coordinate={{
                        latitude: parseFloat(service.location.lat),
                        longitude: parseFloat(service.location.long),
                      }}
                      title={service.name}
                      description={service.desc}
                    />
                  ))}
                </MapView> */}
              </View>
              <View>
                {places.map((place) => {
                  const service = {
                    name: place.displayName.text,
                    location: place.location,
                    images: place.photos[0],
                  };
                  console.log(service);
                  return <View></View>;
                  // return <Card service={service} />;
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MapsPage;
