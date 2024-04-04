import React from "react";
import { Text } from "react-native";

const CustomText = (props: any) => {
  return (
    <Text
      className={`${
        props.bold
          ? "font-['product-b']"
          : props.semibold
          ? "font-['product-sb']"
          : "font-['product']"
      } ${props.primary ? `text-[#2c3e50]` : ""}`}
      style={props.style}
      numberOfLines={props.lines}
    >
      {props.text}
    </Text>
  );
};

export default CustomText;
