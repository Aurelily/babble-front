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

  formContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  inputContent: {
    alignItems: "center",
    width: "100%",
  },
});
