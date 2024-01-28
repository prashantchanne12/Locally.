import { TextInput } from "react-native";
import React from "react";

const Input = (props: any) => {
  return (
    <TextInput
      maxLength={props.maxLength && props.maxLength}
      numberOfLines={props.numberOfLines}
      keyboardType={props.type === "number" ? "numeric" : "default"}
      onChangeText={
        props.number
          ? (value) => props.onChangeText(value.replace(/[^0-9]/g, ""))
          : props.onChangeText
      }
      className=" p-[10px] pl-4 border border-gray-200 font-[robo]"
      style={props.style}
      autoCapitalize="none"
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor="#9ca3af"
      onBlur={props.onBlur}
      selectionColor="rgb(108, 92, 231)"
    />
  );
};

export default Input;
