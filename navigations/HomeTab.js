import React from "react";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import icons tab navigator
import { AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//Navigation
const Tab = createBottomTabNavigator();

//import Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RoomsScreen from "./RoomsScreen";
import UsersScreen from "./UsersScreen";

//import colors
import colors from "../assets/colors";

const HomeTab = ({
  deleteInStore,
  userToken,
  setUserToken,
  url,
  rootPath,
  userId,
  setUserId,
  setUsersConnectedList,
  usersConnectedList,
}) => {
  const [userInfos, setUserInfos] = useState();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.purplePrimary,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: "",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
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
          <HomeScreen
            {...props}
            url={url}
            rootPath={rootPath}
            userId={userId}
            setUserId={setUserId}
            userToken={userToken}
            setUserToken={setUserToken}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            deleteInStore={deleteInStore}
            setUsersConnectedList={setUsersConnectedList}
            usersConnectedList={usersConnectedList}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Discussion"
        options={{
          title: "",
          tabBarLabel: "Salons",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="meeting-room" size={size} color={color} />
          ),
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
          <RoomsScreen
            {...props}
            url={url}
            rootPath={rootPath}
            userToken={userToken}
            setUserToken={setUserToken}
            userId={userId}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            deleteInStore={deleteInStore}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Annuaire"
        options={{
          title: "",
          tabBarLabel: "Annuaire",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" size={size} color={color} />
          ),
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
          <UsersScreen
            {...props}
            url={url}
            rootPath={rootPath}
            userToken={userToken}
            setUserToken={setUserToken}
            userId={userId}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            deleteInStore={deleteInStore}
            setUsersConnectedList={setUsersConnectedList}
            usersConnectedList={usersConnectedList}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          title: "Votre profil Babble",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-edit" size={size} color={color} />
          ),
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
          <ProfileScreen
            {...props}
            url={url}
            rootPath={rootPath}
            userToken={userToken}
            setUserToken={setUserToken}
            deleteInStore={deleteInStore}
            userId={userId}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeTab;
