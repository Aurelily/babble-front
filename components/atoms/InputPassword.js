import React from "react";
import { TextInput, StyleSheet } from "react-native";

//import styles and colors
import colors from "../../assets/colors";
import { genStyles } from "../../styles/genStyles";

const InputPassword = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.orangeThird}
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
