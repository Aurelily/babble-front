import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { genStyles } from "../../styles/genStyles";

const InputEmail = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#fff"
      style={genStyles.inputOrange}
      value={value}
      keyboardType="email-adress"
      onChangeText={(text) => setValue(text)}
      autoCapitalize="none"
    />
  );
};

export default InputEmail;
