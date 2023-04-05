import { StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const profilScreenStyle = StyleSheet.create({
  avatarZone: {
    justifyContent: "center",
    alignItems: "center",
  },
  btLabelZone: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  btOrange: {
    height: 50,
    width: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  btDecoPos: {
    position: "absolute",
    left: -20,
    top: 0,
  },
  btEditPos: {
    position: "absolute",
    right: -10,
    top: 0,
    zIndex: 2,
  },

  avatar: {
    height: 100,
    width: 100,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: 20,
    marginBottom: 20,
  },

  // MODAL AVATARS

  modalAvatarsContent: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 20,
    width: windowWidth,
    height: windowHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  modalbuttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingRight: 20,
    width: "100%",
  },

  avatarTableContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  miniAvatars: {
    height: 50,
    width: 50,
    padding: 10,
  },
  miniAvatarsBtn: {
    padding: 8,
  },
});
