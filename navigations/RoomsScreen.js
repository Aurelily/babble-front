import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Screens
import GeneralChatScreen from "../screens/GeneralChatScreen";
import MessagingScreen from "../screens/MessagingScreen";

// Definition of stack navigator
const Stack = createNativeStackNavigator();

// Import socket from the socket.js file in utils folder
import { leaveRoom } from "../utils/socket";

// Import colors and styles
import colors from "../assets/colors";
import { chatScreensStyles } from "../styles/chatScreensStyles";
import { genStyles } from "../styles/genStyles";

export default function RoomsScreen({
  url,
  rootPath,
  userToken,
  setUserToken,
  userInfos,
  setUserInfos,
  userId,
  setUserId,
  deleteInStore,
}) {
  const navigation = useNavigation();
  const [roomName, setRoomName] = useState("");
  const [roomInfos, setRoomInfos] = useState();

  // Navigates to the Roomlist screen
  const handleNavigation = () => {
    leaveRoom(roomName);
    navigation.navigate("roomsList");
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="roomsList"
        options={{
          title: "Salons de discussion",
          headerStyle: {
            backgroundColor: colors.purpleThird,
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {(props) => (
          <GeneralChatScreen
            {...props}
            url={url}
            rootPath={rootPath}
            userToken={userToken}
            setUserToken={setUserToken}
            userId={userId}
            setUserId={setUserId}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            roomName={roomName}
            setRoomName={setRoomName}
            deleteInStore={deleteInStore}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="messages"
        options={{
          title: "Messages",
          headerStyle: {
            backgroundColor: colors.purpleThird,
            height: 500,
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleNavigation}
              style={[genStyles.rowSpaceBetween, genStyles.genCenter]}
            >
              <Image
                source={require("../assets/img/bt-leave.png")}
                style={[chatScreensStyles.btLeave]}
              />
            </TouchableOpacity>
          ),
        }}
      >
        {(props) => (
          <MessagingScreen
            {...props}
            userId={userId}
            url={url}
            rootPath={rootPath}
            userToken={userToken}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            roomInfos={roomInfos}
            setRoomInfos={setRoomInfos}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
