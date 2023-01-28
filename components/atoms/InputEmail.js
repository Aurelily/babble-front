import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../../assets/colors";

const InputEmail = ({ placeholder, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      keyboardType="email-adress"
      onChangeText={(text) => setValue(text)}
      autoCapitalize="none"
    />
  );
};

export default InputEmail;

const styles = StyleSheet.create({
  input: {
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomColor: colors.purplePrimary,
    borderBottomWidth: 1,
    width: 300,
  },
});
