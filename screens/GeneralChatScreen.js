import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

// Definition of stack navigator

const Stack = createNativeStackNavigator();

//Components
import ModalChat from "../components/molecules/ModalChat";
import ChatComponent from "../components/molecules/ChatComponent";

import { stylesChat } from "../utils/styles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../utils/socket";
import { socketConnect } from "../utils/socket";
import { socketDisconnect } from "../utils/socket";

export default function GeneralChatScreen({
  url,
  userToken,
  userInfos,
  setUserInfos,
  userId,
}) {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  //👇🏻 Runs whenever there is new trigger from the backend
  socketConnect();

  async function fetchGroups() {
    try {
      await fetch(`${url}rooms`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setRooms(data.data);
            setRoomsLoading(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  //👇🏻 Runs when the component mounts
  useEffect(() => {
    socket.on("newRoom", (room) => {
      setRooms((rooms) => [...rooms, room]);
    });

    fetchGroups();
  }, []);

  const handleCreateGroup = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={stylesChat.chatscreen}>
      <View style={stylesChat.chattopContainer}>
        <View style={stylesChat.chatheader}>
          <Text style={stylesChat.chatheading}>Babbler's rooms</Text>

          {/* Displays the Modal component when clicked */}
          <Pressable onPress={handleCreateGroup}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={stylesChat.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item, index) => {
              return index;
            }}
          />
        ) : (
          <View style={stylesChat.chatemptyContainer}>
            <Text style={stylesChat.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? (
        <ModalChat
          setVisible={setVisible}
          url={url}
          userInfos={userInfos}
          userId={userId}
          userToken={userToken}
          setUserInfos={setUserInfos}
          rooms={rooms}
          setRooms={setRooms}
        />
      ) : (
        ""
      )}
    </SafeAreaView>
  );
}
