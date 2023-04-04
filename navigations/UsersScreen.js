import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Screens
import UsersDirScreen from "../screens/UsersDirScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen";

// Definition of stack navigator
const Stack = createNativeStackNavigator();

// Import socket from the socket.js file in utils folder
import { leaveRoom } from "../utils/socket";

// Import colors and styles
import colors from "../assets/colors";
import { chatScreensStyles } from "../styles/chatScreensStyles";
import { genStyles } from "../styles/genStyles";

export default function UsersScreen({
  url,
  rootPath,
  userToken,
  setUserToken,
  userInfos,
  setUserInfos,
  userId,
  deleteInStore,
}) {
  const navigation = useNavigation();

  // Navigates to the Roomlist screen
  const handleNavigation = () => {
    navigation.navigate("usersList");
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="usersList"
        options={{
          title: "Annuaire des Babblers",
          headerStyle: {
            backgroundColor: colors.orangeFourth,
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {(props) => (
          <UsersDirScreen
            {...props}
            url={url}
            userToken={userToken}
            setUserToken={setUserToken}
            userId={userId}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            deleteInStore={deleteInStore}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="userDetail"
        options={{
          title: "Babbler",
          headerStyle: {
            backgroundColor: colors.orangeFourth,
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
          <UserDetailsScreen
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
