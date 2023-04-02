import { StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const genStyles = StyleSheet.create({
  // Formats de Box
  // --------------------
  genCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  colSpaceBetween: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalWidth: {
    width: windowWidth,
  },

  // Padding et margin
  // --------------------
  paddingBase: {
    padding: 20,
  },
  marginTopBase: {
    marginTop: 20,
  },
  marginBottomBase: {
    marginBottom: 20,
  },
  // Types de textes
  // --------------------
  titleClearText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  basicClearText: {
    fontSize: 14,
    color: "#fff",
  },
  basicPurpleText: {
    fontSize: 14,
    color: colors.purplePrimary,
  },
  boldText: {
    fontWeight: "bold",
  },
  miniPurpleText: {
    fontSize: 10,
    color: colors.purplePrimary,
  },

  textAlignCenter: {
    textAlign: "center",
  },

  titlePurpleText: {
    fontSize: 20,
    color: colors.purplePrimary,
    fontWeight: "bold",
  },
  subtitlePurpleText: {
    fontSize: 16,
    color: colors.purplePrimary,
    fontWeight: "bold",
  },
  titleOrangeText: {
    fontSize: 20,
    color: colors.orangePrimary,
    fontWeight: "bold",
  },
  subtitleOrangeText: {
    fontSize: 16,
    color: colors.orangePrimary,
    fontWeight: "bold",
  },
  textContainerWidth: {
    marginRight: 10,
    marginLeft: 10,
  },

  // FORMULAIRES
  // ------------------------------------

  inputOrange: {
    backgroundColor: colors.orangePrimary,
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    color: "white",
  },
  msgAlert: {
    color: colors.purplePrimary,
  },

  formContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
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
    marginBottom: -5,
  },

  buttonForm: {
    position: "relative",
    width: "100%",
    borderRadius: 25,
    padding: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  shiny: {
    position: "absolute",
    top: 0,
    right: 5,
    width: 20,
    aspectRatio: 2.5,
    resizeMode: "contain",
  },

  buttonsClearText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
