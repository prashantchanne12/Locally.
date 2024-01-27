import React from "react";
import { Text } from "react-native";

const CustomText = (props: any) => {
  return (
    <Text
      className={`${
        props.bold
          ? "font-['robo-b']"
          : props.semibold
          ? "font-['robo-sb']"
          : "font-['robo']"
      } ${props.primary ? `text-[#6c5ce7]` : ""}`}
      style={props.style}
    >
      {props.text}
    </Text>
  );
};

export default CustomText;
