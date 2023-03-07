import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Server from "./env";

// Import icons
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import MessagingScreen from "./screens/MessagingScreen";
import GeneralChatScreen from "./screens/GeneralChatScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";
import UsersDirScreen from "./screens/UsersDirScreen";

// Import navigation
import HomeTabs from "./navigations/HomeTab";

// Definition of stack navigator
const Stack = createNativeStackNavigator();

// variable URL
const url = "http://" + Server.SERVER_IP + ":3000/";

export default function App() {
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

  // Function to save something in expo secure store
  async function saveToStore(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  // Function to get something in expo secure store
  async function getFromStore(key, value) {
    await SecureStore.getItemAsync(key, value);
  }

  // Function to delete something in expo secure store
  async function deleteInStore(key) {
    await SecureStore.deleteItemAsync(key);
  }

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
        <HomeTabs
          deleteInStore={deleteInStore}
          userId={userId}
          userToken={userToken}
          setUserToken={setUserToken}
          url={url}
        />
      )}
    </NavigationContainer>
  );
}
