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

const NameAndLocation = () => {
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

  const onSubmit = (data: any) => {
    // Simulate form submission
    console.log("Submitted Data:", data);
    //   router.push("/screens/AddStore/AddStore2");
  };

  return (
    <SafeAreaView className="bg-gray-50 h-full">
      <ScrollView className="px-5 py-2">
        <CustomText className="text-4xl pt-2 mt-3" bold text="New Service" />
        <View className="space-y-6">
          <View className="space-y-1">
            <CustomText
              className="uppercase text-lg pt-2"
              text="Service Type*"
              semibold
              primary
            />
            <View className="border border-gray-200 rounded-sm ">
              <Picker
                dropdownIconColor="green"
                dropdownIconRippleColor="green"
                selectedValue={service}
                onValueChange={(itemValue, itemIndex) => setService(itemValue)}
              >
                {serviceTypes.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
            </View>
          </View>
          <View className="space-y-1">
            <CustomText
              className="uppercase text-lg"
              text="Name*"
              primary
              semibold
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
              <Text className="text-sm text-red-700">Name is required.</Text>
            )}
          </View>
          <View className="space-y-1">
            <CustomText
              className="uppercase text-lg"
              text="Address*"
              primary
              semibold
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
                  <Text className="text-sm text-red-700">
                    This field is required.
                  </Text>
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
                  <Text className="text-sm text-red-700">
                    This field is required.
                  </Text>
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
                  <Text className="text-sm text-red-700">
                    This field is required.
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View className="space-y-1">
            <View className="mb-2">
              <CustomText
                text="Loaction*"
                semibold
                className="uppercase text-lg text-green-700 pt-1"
              />

              <Text className="text-xs text-gray-500 -mt-2">
                Selected automatically based on your location for now
              </Text>
            </View>
            <View className="h-[200px] w-full mt-2">
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
            </View>
          </View>
        </View>
        <View className="flex-row space-x-2 mt-5 mb-5 justify-end">
          <Button
            onClick={() => {
              console.log("Clicked");
            }}
            text="Prev"
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            text="Next"
            title="Submit"
            primary
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NameAndLocation;
