import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomText from "../components/CustomText";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import Input from "../components/Input";
import { StatusBar } from "expo-status-bar";

const Operations = () => {
  const sourceMoment = moment.unix(1636765200);
  const sourceDate = sourceMoment.local().toDate();
  const [time, setTime] = useState(sourceDate);
  const [show, setShow] = useState(false);
  const [startTime, setStartTime] = useState({
    clicked: false,
    time: "8:00 AM",
  });
  const [endTime, setEndTime] = useState({
    clicked: false,
    time: "10:00 PM",
  });
  const [days, setDays] = useState([
    { id: 1, text: "Monday", isChecked: false },
    { id: 2, text: "Tuesday", isChecked: false },
    { id: 3, text: "Wednesday", isChecked: false },
    { id: 4, text: "Thursday", isChecked: false },
    { id: 5, text: "Friday", isChecked: false },
    { id: 6, text: "Saturday", isChecked: false },
    { id: 7, text: "Sunday", isChecked: false },
  ]);
  const [daysUnchecked, setDaysUnchecked] = useState(false);
  const {
    control,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contactNumber: null,
    },
  });

  const handleSubmit = () => {
    const isAllUnchecked = days.find((item) => item.isChecked);
    if (!isAllUnchecked) {
      setDaysUnchecked(true);
      return;
    }
    setDaysUnchecked(false);
    originalHandleSubmit(onSubmit)();
  };

  const onSubmit = (data: any) => {
    // Simulate form submission
    console.log("Submitted Data:", data);
    router.push("/(pages)/PhotosAndDescription");
  };

  const onChange = (event: any, selectedTime: any) => {
    const time = selectedTime.toLocaleString();
    let newTime = time.split(", ")[1].split(" ");
    const amOrPm = newTime[0].includes("am") ? "am" : "pm";
    console.log(newTime);
    newTime = newTime[0].split(":")[0] + ":" + newTime[0].split(":")[1];

    if (startTime.clicked && event.type === "set") {
      setStartTime({
        time: `${newTime} ${amOrPm}`,
        clicked: false,
      });
      setShow(false);
    } else if (endTime.clicked && event.type === "set") {
      setEndTime({
        time: `${newTime} ${amOrPm}`,
        clicked: false,
      });
      setShow(false);
    }

    if (event.type === "dismissed") {
      setShow(false);
    }
  };

  return (
    <View>
      <StatusBar style="dark" />
      <ScrollView className="px-5 py-2 bg-white h-full">
        {show && (
          <View>
            <DateTimePicker
              mode="time"
              value={time}
              onChange={onChange}
              accentColor="#6c5ce7"
              textColor="#6c5ce7"
            />
          </View>
        )}
        <View>
          <View className="mt-5">
            <CustomText
              className="capitalize text-base mb-1"
              text="Contact Number*"
              primary
              bold
            />
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 10,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Contact Number*"
                  type="number"
                  number
                  maxLength={10}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="contactNumber"
            />
            {errors.contactNumber?.type === "minLength" && (
              <CustomText
                className="text-sm text-red-700"
                text="Invalid contact number"
              />
            )}
            {errors.contactNumber?.type === "required" && (
              <CustomText
                className="text-sm text-red-700"
                text="Contact number is required."
              />
            )}
          </View>
          <View className="flex-row justify-between my-5 items-center mt-11">
            <View>
              <CustomText
                text="Opens at*"
                bold
                primary
                className="text-base mb-1 capitalize"
              ></CustomText>
              <View className="flex-row space-x-2 items-center mt-2">
                <CustomText
                  text={startTime.time}
                  semibold
                  className="text-lg"
                />
                <TouchableOpacity
                  onPress={() => {
                    setShow(!show);
                    setStartTime({ ...startTime, clicked: true });
                  }}
                >
                  <View>
                    <Feather name="edit-2" size={20} color="#6c5ce7" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <CustomText text="to" className="text-xl mt-9 " semibold />
            </View>
            <View>
              <CustomText
                text="Closes at*"
                bold
                primary
                className="text-base mb-1 capitalize"
              ></CustomText>
              <View className="flex-row space-x-2 items-center mt-2">
                <CustomText text={endTime.time} semibold className="text-lg" />
                <TouchableOpacity
                  onPress={() => {
                    setShow(!show);
                    setEndTime({ ...endTime, clicked: true });
                  }}
                >
                  <View>
                    <Feather name="edit-2" size={18} color="#6c5ce7" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="mt-7">
            <CustomText
              text="Days Open*"
              className="capitalize text-base mb-1"
              bold
              primary
            />
            <View className="flex-row flex-wrap mt-2 items-center justify-between">
              {days.map((day) => (
                <View
                  key={day.id}
                  className="flex-row w-[120px] p-2 items-center space-x-2"
                >
                  <Checkbox
                    value={day.isChecked}
                    onValueChange={() => {
                      const updatedDays = days.map((item) => {
                        if (item.id === day.id) {
                          return { ...item, isChecked: !item.isChecked };
                        }
                        return { ...item };
                      });
                      setDays(updatedDays);
                    }}
                    color={day.isChecked ? "#6c5ce7" : undefined}
                  />
                  <CustomText text={day.text} className="text-base" semibold />
                </View>
              ))}
            </View>
            {daysUnchecked && (
              <CustomText
                text="You need to select at least one day"
                className="text-sm text-red-700"
              />
            )}
          </View>
        </View>
        <View className="my-5">
          <View className="flex-row justify-end items-center space-x-2 ">
            <Button text="Prev" onClick={() => router.back()} />
            <Button onClick={handleSubmit} text="Next" primary title="Submit" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Operations;
