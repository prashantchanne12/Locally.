import { TextInput } from "react-native";
import React from "react";

const Input = (props: any) => {
  return (
    <TextInput
      maxLength={props.maxLength && props.maxLength}
      keyboardType={props.type === "number" ? "number-pad" : "default"}
      className="bg-gray-50 p-3 pl-4 border border-gray-200 rounded-sm"
      style={props.style}
      autoCapitalize="none"
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor="#9ca3af"
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      selectionColor="rgb(22, 160, 133)"
    />
  );
};

export default Input;
