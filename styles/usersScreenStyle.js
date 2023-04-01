import { StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const usersScreenStyle = StyleSheet.create({
  //// USER LIST

  container: {
    alignItems: "center",
    position: "relative",
  },
  titleModal: {
    marginBottom: 20,
  },

  userslistContainer: {
    marginTop: 100,
    marginBottom: 50,
    width: windowWidth,
    flex: 1,
    flexGrow: 1,
  },
  flatlistContainer: {
    marginBottom: 100,
  },
  flatListEmptyContainer: {
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
  btLeave: {
    height: 45,
    width: 45,
    marginRight: 10,
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
  btOrangeFlat: {
    height: 50,
    width: 50,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginRight: 10,
  },
  //// USERS LIST : USER COMPONENT

  component: {
    width: windowWidth,
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
  cUserName: {
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
    width: "100%",
  },
  modaltext: {
    color: "#fff",
  },

  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
  switchZone: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "white",
    marginTop: -20,
  },
  illus: {
    width: 150,
    height: 150,
  },
  btSignal: {
    width: 50,
    height: 50,
  },

  // MESSENGING SCREEN

  messagingscreenContainer: {
    flex: 1,
    width: windowWidth,
  },
  messagingscreen: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 100,
  },

  // MESSAGE FORM

  messaginginputContainer: {
    /*    position: "absolute",
    bottom: 0, */
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    paddingLeft: 50,
    width: "100%",
    minHeight: 200,
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    zIndex: 999,
  },

  messagingbuttonContainer: {
    width: "20%",
    borderRadius: 3,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 50,
  },

  // MESSAGE COMPONENT
  mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },

  mavatar: {
    marginRight: 5,
  },

  messageOther: {
    width: "80%",
    backgroundColor: colors.purpleSecondary,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    marginBottom: 2,
  },

  messageCreator: {
    width: "80%",
    backgroundColor: colors.orangePrimary,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,
    marginBottom: 2,
  },

  messageDate: {
    position: "absolute",
    right: 5,
    padding: 10,
  },
  messageAuthor: {
    position: "absolute",
    top: 20,
    right: 5,
    padding: 10,
  },
  flatlistMessagesContainer: {
    /*  marginBottom: 280, */
    height: "70%",
  },
  keyboardAvoidingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    keyboardVerticalOffset: -60,
  },
});
