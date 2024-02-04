import { TouchableOpacity } from "react-native";
import React from "react";
import { PRIMARY } from "@/utils/constants";
import CustomText from "./CustomText";

const Button = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      className={`${props.primary ? "bg-[#2c3e50]" : ``}`}
      style={props.style}
    >
      <CustomText
        text={props.text}
        className={`${
          props.primary ? `text-white` : `border border-gray-200`
        }  px-6 py-[10px] text-center font-['robo-sb'] `}
      />
    </TouchableOpacity>
  );
};

export default Button;
