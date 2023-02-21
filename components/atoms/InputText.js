import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { genStyles } from "../../styles/genStyles";

const InputText = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#fff"
      style={genStyles.inputOrange}
      value={value}
      autoCompleteType="off"
      autoCapitalize="none"
      onChangeText={(text) => setValue(text)}
    />
  );
};

export default InputText;

/* const styles = StyleSheet.create({
  input: {
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomColor: colors.purplePrimary,
    borderBottomWidth: 1,
    width: 300,
  },
});
 */
