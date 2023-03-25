import { StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const chatScreensStyles = StyleSheet.create({
  //// ROOM LIST

  container: {
    alignItems: "center",
    position: "relative",
  },
  titleModal: {
    marginBottom: 20,
  },

  chatlistContainer: {
    marginTop: 100,
    marginBottom: 50,
    width: windowWidth,
    flex: 1,
    flexGrow: 1,
  },
  chatemptyContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },

  bgImage: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
  },
  topZone: {
    justifyContent: "center",
    alignItems: "center",
  },
  btDecoPos: {
    position: "absolute",
    right: 100,
    top: 0,
  },
  btAddPos: {
    position: "absolute",
    left: 90,
    top: 0,
  },
  coupleOrange: {
    position: "absolute",
    right: -70,
    top: 0,
    width: 150,
    height: 72,
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
  //// ROOM LIST : CHAT COMPONENT

  component: {
    width: windowWidth,
    /* backgroundColor: "#fff", */
    height: 80,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  bgOpacity: {
    position: "absolute",
    width: 500,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
    paddingHorizontal: 15,
    opacity: 0.5,
    zIndex: -500,
  },
  cavatar: {
    marginRight: 15,
  },
  cContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  cRoomName: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },

  //// ROOM LIST : MODAL ADD ROOM

  formContent: {
    position: "absolute",
    top: 0,
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

  modalbutton: {
    width: "40%",
    height: 45,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  modalbuttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  modaltext: {
    color: "#fff",
  },

  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
});
