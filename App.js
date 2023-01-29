import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import GeneralChatScreen from "./screens/GeneralChatScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";
import UsersDirScreen from "./screens/UsersDirScreen";

// Definition of stack navigator
const Stack = createNativeStackNavigator();

// variable URL
const url = "http://localhost:3000/";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fonction setToken pour enregistrer ou supprimer le token de l'Expo Secure Store et du state userToken
  const setToken = async (token) => {
    /*   if (token) {
      SecureStore.getItemAsync("userToken", token);
    } else {
      SecureStore.deleteItemAsync("userToken");
    } */
    setUserToken(token);
  };

  // Fonction getUserId pour enregistrer le userId dans l'Expo Secure Store
  const getUserId = async (userId) => {
    if (userId) {
      SecureStore.setItemAsync("userId", userId);
    } else {
      SecureStore.deleteItemAsync("userId");
    }
    setUserId(userId);
  };

  useEffect(() => {
    // Fetch the token and userId from Expo Secure Store then navigate to our appropriate place
    const fetchToken = async () => {
      // We should also handle error for production apps
      const userToken = await SecureStore.getItemAsync("userToken");
      const userId = await SecureStore.getItemAsync("userId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //Time : simulate uploading Splash Screen for 3 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      setIsLoading(false);
      setUserToken(userToken);
      setUserId(userId);
    };

    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {isLoading && <SplashScreen />}
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {() => (
              <LoginScreen
                setToken={setToken}
                getUserId={getUserId}
                url={url}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {() => (
              <RegisterScreen
                setToken={setToken}
                getUserId={getUserId}
                url={url}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {() => (
              <HomeScreen setToken={setToken} getUserId={getUserId} url={url} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
