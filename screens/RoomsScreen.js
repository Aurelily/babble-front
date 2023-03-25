import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Screens
import GeneralChatScreen from "./GeneralChatScreen";
import MessagingScreen from "./MessagingScreen";

// Definition of stack navigator
const Stack = createNativeStackNavigator();

// Import socket from the socket.js file in utils folder
import { leaveRoom } from "../utils/socket";

// Import colors
import colors from "../assets/colors";

export default function RoomsScreen({
  url,
  userToken,
  setUserToken,
  userInfos,
  setUserInfos,
  userId,
  deleteInStore,
}) {
  const navigation = useNavigation();
  const [roomName, setRoomName] = useState("");

  ///👇🏻 Navigates to the Roomlist screen
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
            userToken={userToken}
            setUserToken={setUserToken}
            userId={userId}
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
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleNavigation}>
              <Text>Sortir</Text>
            </TouchableOpacity>
          ),
        }}
      >
        {(props) => (
          <MessagingScreen
            {...props}
            userId={userId}
            url={url}
            userToken={userToken}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
