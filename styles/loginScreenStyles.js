import { StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const loginScreenStyle = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  logoZone: {
    justifyContent: "center",
    alignItems: "center",
  },

  logoSign: {
    aspectRatio: 2.5,
    resizeMode: "contain",
  },
  bgImage: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
  },
  emoRegister: {
    aspectRatio: 0.5,
    resizeMode: "contain",
    margin: -30,
  },
});
