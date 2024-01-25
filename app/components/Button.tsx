import { TouchableOpacity } from "react-native";
import React from "react";
import { PRIMARY } from "@/utils/constants";
import CustomText from "./CustomText";

const Button = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      className={`${props.primary ? "bg-[#16a085]" : ``}`}
      style={props.style}
    >
      <CustomText
        text={props.text}
        className={`${
          props.primary ? `text-white` : `border border-gray-200`
        } text-base px-6 py-2 rounded-sm text-center font-['mukta-sb'] pt-3`}
      />
    </TouchableOpacity>
  );
};

export default Button;
