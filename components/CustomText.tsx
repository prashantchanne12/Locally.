import { Text } from "react-native";
import React from "react";

const CustomText = (props: any) => {
  return (
    <Text
      className={`${
        props.bold
          ? "font-['mukta-sb']"
          : props.semibold
          ? "font-['mukta-b']"
          : ""
      } ${props.primary ? `text-[#16a085]` : ""}`}
      style={props.style}
    >
      {props.text}
    </Text>
  );
};

export default CustomText;
