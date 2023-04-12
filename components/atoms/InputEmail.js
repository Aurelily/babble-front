import React from "react";
import { TextInput } from "react-native";

//import styles and colors
import colors from "../../assets/colors";
import { genStyles } from "../../styles/genStyles";

const InputEmail = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.orangeThird}
      style={genStyles.inputOrange}
      value={value}
      keyboardType="email-adress"
      onChangeText={(text) => setValue(text)}
      autoCapitalize="none"
    />
  );
};

export default InputEmail;
