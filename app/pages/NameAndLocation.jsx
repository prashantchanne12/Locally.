import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomText from "../components/CustomText";
import Button from "../components/Button";
import Input from "../components/Input";
import { router } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { serviceTypes } from "@/utils/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { PRIMARY } from "../../utils/constants";

const NameAndLocation = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [service, setService] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      storeName: "",
      address1: "",
      address2: "",
      address3: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    navigation.navigate("Operations");
  };

  return (
    <View className="bg-white h-full">
      <StatusBar backgroundColor={PRIMARY} />
      <ScrollView className="px-5">
        <View className="space-y-6 mt-3">
          <View className="space-y-1">
            <CustomText
              className="capitalize text-base mb-1 pt-2"
              text="Service Type*"
              bold
              primary
            />
            <View className="border border-gray-200 ">
              <Picker
                dropdownIconColor="#2c3e50"
                dropdownIconRippleColor="#2c3e50"
                selectedValue={service}
                onValueChange={(itemValue, itemIndex) => setService(itemValue)}
              >
                {serviceTypes.map((item) => (
                  <Picker.Item
                    key={item}
                    label={item}
                    value={item}
                    style={{
                      fontFamily: "serif",
                      fontWeight: "600",
                    }}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View className="space-y-1">
            <CustomText
              className="capitalize text-base mb-1"
              text="Name*"
              primary
              bold
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Store Name*"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="storeName"
            />
            {errors.storeName && (
              <CustomText
                className="text-sm text-red-700"
                text="Name is required."
              />
            )}
          </View>

          <View className="space-y-1">
            <CustomText
              className="capitalize text-base mb-1"
              text="Address*"
              primary
              bold
            />
            <View className="space-y-4">
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      placeholder="Address Line 1*"
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="address1"
                />
                {errors.address1 && (
                  <CustomText
                    className="text-sm text-red-700"
                    text="This field is required."
                  />
                )}
              </View>

              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      placeholder="Address Line 2*"
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="address2"
                />
                {errors.address2 && (
                  <CustomText
                    className="text-sm text-red-700"
                    text="This field is required."
                  />
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Address Line 3"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="address3"
                />
                {errors.address3 && (
                  <CustomText
                    className="text-sm text-red-700"
                    text="This field is required."
                  />
                )}
              </View>
            </View>
          </View>
          <View className="space-y-1">
            <View className="mb-1">
              <CustomText
                text="Loaction*"
                bold
                primary
                className="capitalize text-base mb-1 pt-1"
              />
              <CustomText
                className="text-xs text-gray-500"
                text="Selected automatically based on your location for now"
              />
            </View>
            {/* <View className="h-[200px] w-full mt-2">
              <MapView
                provider={PROVIDER_GOOGLE}
                className="w-full h-full"
                initialRegion={{
                  latitude: 19.0559,
                  longitude: 72.8721,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: 19.0559,
                    longitude: 72.8721,
                  }}
                  title="Your Location"
                  description="You are here"
                />
              </MapView>
            </View> */}
          </View>
        </View>
        <View className="flex-row space-x-2 mt-5 mb-5 justify-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            text="Next"
            title="Submit"
            primary
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default NameAndLocation;
