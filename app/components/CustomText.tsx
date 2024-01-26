import React from "react";
import { Text } from "react-native";

const CustomText = (props: any) => {
  return (
    <Text
      className={`${
        props.bold
          ? "font-['mukta-b']"
          : props.semibold
          ? "font-['mukta-sb']"
          : ""
      } ${props.primary ? `text-[#16a085]` : ""}`}
      style={props.style}
    >
      {props.text}
    </Text>
  );
};

export default CustomText;
