import { StyleSheet } from "react-native";
import colors from "../assets/colors";

export const genStyles = StyleSheet.create({
  genCenter: {
    alignItems: "center",
    justifyContent: "center",
  },

  basicClearText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },

  textAlignCenter: {
    textAlign: "center",
  },

  inputOrange: {
    backgroundColor: colors.orangePrimary,
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});
