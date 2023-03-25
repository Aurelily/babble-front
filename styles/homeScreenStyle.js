import { StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const homeScreenStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  avatar: {
    height: 200,
    width: 200,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: 50,
    marginBottom: 20,
  },
  bgImage: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
  },

  buttonsContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  marginBottomLarge: {
    marginBottom: 100,
  },
  marginBottomMedium: {
    marginBottom: 50,
  },
});
