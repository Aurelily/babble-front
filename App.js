import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Server from "./env";

// jwt-decode library to decode jwtToken
import jwtDecode from "jwt-decode";

// Import screens

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";

// Component
import HomeTab from "./navigations/HomeTab";

// Definition of stack navigator
const Stack = createNativeStackNavigator();

// variable URL
const url = "http://" + Server.SERVER_IP + ":3000/";

// variable chemin absolue pour avatars
const rootPath = "http://design-dev.net/projet-babble/avatars/";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "./utils/socket";
import { socketConnect, socketDisconnect } from "./utils/socket";

export default function App() {
  // States :
  const [isLoading, setIsLoading] = useState(true);
  const [keyTokenStore, setKeyTokenStore] = useState("jwtToken");
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userDatas, setUserDatas] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [usersConnectedList, setUsersConnectedList] = useState([]);

  // Function to save something in expo secure store
  async function saveToStore(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  // Function to delete something in expo secure store
  async function deleteInStore(key) {
    await SecureStore.deleteItemAsync(key);
  }

  socket.on("userOnlineList", function (userOnlineList) {
    setUsersConnectedList(userOnlineList);
    console.log("APP USERS CONNECTED LISTE : " + usersConnectedList);
  });

  useEffect(() => {
    // Function to get value from Secure Store key
    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        setUserToken(result);
        alert("🔐 Here's your value 🔐 \n" + result);
      } else {
        alert("No values stored under that key.");
      }
    }
    getValueFor("jwtToken");

    // ENLEVER A LA FIN : Pour vider le secure store et le token si j'ai fait une erreur
    /*  deleteInStore("jwtToken");
    setUserToken(null); */

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {isLoading && <SplashScreen />}
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{
              title: "Bienvenue sur",
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
            {() => (
              <LoginScreen
                keyTokenStore={keyTokenStore}
                setUserToken={setUserToken}
                saveToStore={saveToStore}
                setUserId={setUserId}
                url={url}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            options={{
              title: "Inscription",
              headerStyle: {
                backgroundColor: "#b182fa",
              },
              headerShadowVisible: false,
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerLeft: () => <Text></Text>,
            }}
          >
            {() => <RegisterScreen url={url} setUserDatas={setUserDatas} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <HomeTab
          deleteInStore={deleteInStore}
          userId={userId}
          setUserId={setUserId}
          userToken={userToken}
          setUserToken={setUserToken}
          url={url}
          rootPath={rootPath}
          setUsersConnectedList={setUsersConnectedList}
          usersConnectedList={usersConnectedList}
        />
      )}
    </NavigationContainer>
  );
}
