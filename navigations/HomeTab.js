import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

//import icons tab navigator
import { AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";

//Navigation
const Tab = createBottomTabNavigator();

//import Screens
import HomeScreen from "../screens/HomeScreen";
import GeneralChatScreen from "../screens/GeneralChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UsersDirScreen from "../screens/UsersDirScreen";

//import colors
import colors from "../assets/colors";
const { purplePrimary } = colors;

const HomeTabs = ({ deleteInStore, userToken, setUserToken, url, userId }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: purplePrimary,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            url={url}
            userId={userId}
            userToken={userToken}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Discussion"
        options={{
          tabBarLabel: "Discussion",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" size={size} color={color} />
          ),
        }}
      >
        {(props) => <GeneralChatScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-edit" size={size} color={color} />
          ),
        }}
      >
        {(props) => (
          <ProfileScreen
            {...props}
            setUserToken={setUserToken}
            deleteInStore={deleteInStore}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Annuaire"
        options={{
          tabBarLabel: "Annuaire",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" size={size} color={color} />
          ),
        }}
      >
        {(props) => <UsersDirScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
