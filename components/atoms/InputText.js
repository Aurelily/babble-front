import React from "react";
import { TextInput } from "react-native";

//import styles and colors
import colors from "../../assets/colors";
import { genStyles } from "../../styles/genStyles";

const InputText = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.orangeThird}
      style={genStyles.inputOrange}
      value={value}
      autoCompleteType="off"
      autoCapitalize="none"
      onChangeText={(text) => setValue(text)}
    />
  );
};

export default InputText;
