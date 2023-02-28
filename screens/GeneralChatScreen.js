import React from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

import ChatComponent from "../components/molecules/ChatComponent";
//👇🏻 The Modal component
import Modal from "../components/molecules/ModalChat";

import { stylesChat } from "../utils/styles";

export default function GeneralChatScreen() {
  const [visible, setVisible] = useState(false);
  //👇🏻 Dummy list of rooms
  const rooms = [
    {
      id: "1",
      name: "Pokemons",
      messages: [
        {
          id: "1a",
          content: "Hello guys, welcome!",
          datePublished: "07:50",
          author: "Tomer",
        },
        {
          id: "1b",
          content: "Hi Tomer, thank you! 😇",
          datePublished: "08:50",
          author: "David",
        },
      ],
    },
    {
      id: "2",
      name: "Les ptits potes",
      messages: [
        {
          id: "2a",
          content: "Guys, who's awake? 🙏🏽",
          datePublished: "12:50",
          author: "Team Leader",
        },
        {
          id: "2b",
          content: "What's up? 🧑🏻‍💻",
          datePublished: "03:50",
          author: "Victoria",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={stylesChat.chatscreen}>
      <View style={stylesChat.chattopContainer}>
        <View style={stylesChat.chatheader}>
          <Text style={stylesChat.chatheading}>Babbler's rooms</Text>

          {/* Displays the Modal component when clicked */}
          <Pressable onPress={() => setVisible(true)}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={stylesChat.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={stylesChat.chatemptyContainer}>
            <Text style={stylesChat.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} /> : ""}
    </SafeAreaView>
  );
}
