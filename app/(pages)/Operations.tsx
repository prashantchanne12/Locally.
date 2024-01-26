import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../components/CustomText";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";

const Operations = () => {
  const sourceMoment = moment.unix(1636765200);
  const sourceDate = sourceMoment.local().toDate();
  const [time, setTime] = useState(sourceDate);
  const [show, setShow] = useState(false);
  const [startTime, setStartTime] = useState({
    clicked: false,
    time: "8:00 AM",
  });
  const [endTime, setEndTime] = useState({ clicked: false, time: "10:00 PM" });

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
      <ScrollView className="px-5 py-2">
        {show && (
          <View>
            <DateTimePicker mode="time" value={time} onChange={onChange} />
          </View>
        )}
        <CustomText className="text-4xl pt-2 mt-3" bold text="Operations" />
        <View className="flex-row justify-between my-5 items-center">
          <View>
            <CustomText
              text="Opens at*"
              bold
              primary
              className="text-lg uppercase"
            ></CustomText>
            <View className="flex-row space-x-2 items-center mt-2">
              <CustomText text={startTime.time} semibold className="text-xl" />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Operations;
