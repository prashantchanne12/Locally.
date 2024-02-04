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
      } ${props.primary ? `text-[#2c3e50]` : ""}`}
      style={props.style}
    >
      {props.text}
    </Text>
  );
};

export default CustomText;
