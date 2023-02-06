import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

//Colors:
import colors from "../assets/colors";
const { purplePrimary, grey } = colors;

export default function ProfileScreen({ deleteInStore, setUserToken }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screen My Profil Update</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deleteInStore("jwtToken");
          setUserToken(null);
        }}
      >
        <Text>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    alignItems: "center",
  },

  // *---- LOGO ZONE ----*
  logoZone: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },

  logoSign: {
    height: 100,
    width: 100,
  },

  signTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: grey,
  },

  subTitle: {
    fontSize: 12,
    color: grey,
  },

  // *---- FORM ----*

  formContent: {
    // backgroundColor: "purple",
    width: "80%",
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputContent: {
    alignItems: "center",
    width: "100%",
  },

  input: {
    width: "100%",
    height: 50,
    borderBottomColor: purplePrimary,
    borderBottomWidth: 1,
  },

  buttonsContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    borderColor: purplePrimary,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 200,
    marginVertical: 30,
  },

  txtButton: {
    color: grey,
    fontSize: 20,
    fontWeight: "bold",
  },

  msgAlert: {
    color: purplePrimary,
  },

  txtLink: {
    justifyContent: "center",
    alignItems: "center",
  },
});
