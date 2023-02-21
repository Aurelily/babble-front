import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { genStyles } from "../../styles/genStyles";

const InputPassword = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#fff"
      style={genStyles.inputOrange}
      value={value}
      autoCompleteType="off"
      autoCapitalize="none"
      secureTextEntry={true}
      onChangeText={(text) => setValue(text)}
    />
  );
};

export default InputPassword;
