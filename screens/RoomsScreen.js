import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import GeneralChatScreen from "./GeneralChatScreen";
import MessagingScreen from "./MessagingScreen";

// Definition of stack navigator
const Stack = createNativeStackNavigator();

export default function RoomsScreen({
  url,
  userToken,
  userInfos,
  setUserInfos,
  userId,
}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="roomsList"
        options={{
          title: "Babbler's Rooms",
          headerStyle: {
            backgroundColor: "#feb863",
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
            userId={userId}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="messages"
        options={{
          title: "Messages",
          headerStyle: {
            backgroundColor: "#b182fa",
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
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
