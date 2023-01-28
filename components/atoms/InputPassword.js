import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../../assets/colors";

const InputPassword = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      autoCompleteType="off"
      autoCapitalize="none"
      secureTextEntry={true}
      onChangeText={(text) => setValue(text)}
    />
  );
};

export default InputPassword;

const styles = StyleSheet.create({
  input: {
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomColor: colors.purplePrimary,
    borderBottomWidth: 1,
    width: 300,
  },
});
