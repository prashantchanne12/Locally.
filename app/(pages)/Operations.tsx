import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../components/CustomText";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import Input from "../components/Input";

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
    // router.push("/(pages)/Home");
  };

  const onChange = (event: any, selectedTime: any) => {
    const time = selectedTime.toLocaleString();
    let newTime = time.split(", ")[1].split(" ");
    const amOrPm = newTime[1];
    newTime = newTime[0].split(":")[0] + ":" + newTime[0].split(":")[1];

    if (startTime.clicked && event.type === "set") {
      setStartTime({
        time: `${newTime} ${amOrPm}`,
        clicked: false,
      });
      setShow(false);
    } else if (endTime.clicked && event.type === "set") {
      console.log("Setting end time....");
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
    <SafeAreaView>
      <ScrollView className="px-5 py-2 bg-gray-50 h-full">
        {show && (
          <View>
            <DateTimePicker mode="time" value={time} onChange={onChange} />
          </View>
        )}
        <CustomText className="text-4xl pt-2 mt-3" bold text="Operations" />
        <View>
          <View className="mt-5">
            <CustomText
              className="uppercase text-lg"
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
                className="text-lg uppercase"
              ></CustomText>
              <View className="flex-row space-x-2 items-center mt-2">
                <CustomText
                  text={startTime.time}
                  semibold
                  className="text-xl"
                />
                <TouchableOpacity
                  onPress={() => {
                    setShow(!show);
                    setStartTime({ ...startTime, clicked: true });
                  }}
                >
                  <View className="bg-[#16a085] rounded-full p-2 -mt-2">
                    <Feather name="edit-2" size={22} color="white" />
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
                className="text-lg uppercase"
              ></CustomText>
              <View className="flex-row space-x-2 items-center mt-2">
                <CustomText text={endTime.time} semibold className="text-xl" />
                <TouchableOpacity
                  onPress={() => {
                    setShow(!show);
                    setEndTime({ ...endTime, clicked: true });
                  }}
                >
                  <View className="bg-[#16a085] rounded-full p-2 -mt-2">
                    <Feather name="edit-2" size={22} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="mt-7">
            <CustomText
              text="Days Open*"
              className="uppercase text-lg"
              bold
              primary
            />
            <View className="flex-row flex-wrap mt-2">
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
                    color={day.isChecked ? "#16a085" : undefined}
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
      </ScrollView>
      <View className="absolute right-0 bottom-0 p-5">
        <View className="flex-row justify-end items-center space-x-2 ">
          <Button text="Prev" />
          <Button onClick={handleSubmit} text="Next" primary title="Submit" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Operations;
