import { StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const registerScreenStyle = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  avatarZone: {
    justifyContent: "center",
    alignItems: "center",
  },

  bgImage: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
