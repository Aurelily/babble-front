import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
/* import AsyncStorage from "@react-native-async-storage/async-storage"; */
import MessageComponent from "../components/molecules/MessageComponent";
import { stylesChat } from "../utils/styles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../utils/socket";

const MessagingScreen = ({ route, navigation, userId, url, userToken }) => {
  /*   const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      content: "Hello guys, welcome!",
      datePublished: "07:50",
      author: "Tomer",
    },
    {
      id: "2",
      content: "Hi Tomer, thank you! 😇",
      datePublished: "08:50",
      author: "David",
    },
  ]); */
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messagesLoading, setMessageLoading] = useState(true);

  //👇🏻 Access the chatroom's name and id
  const { name, id } = route.params;

  const [chatMessages, setChatMessages] = useState([]);

  //👇🏻 This function gets the username with id
  async function getUsername() {
    try {
      await fetch(`${url}users/details/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setUser(data.data.firstname);
            setMessageLoading(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
  const handleNewMessage = () => {
    console.log("coucou");
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    if (user) {
      console.log("coucou2");
      socket.emit("newMessage", {
        message,
        room_id: id,
        user,
        timestamp: { hour, mins },
      });
    }
  };

  //👇🏻 Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
    getUsername();
    //👇🏻 Sends the id to the server to fetch all its messages
    socket.emit("findRoom", id);
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, []);

  //👇🏻 This runs when the messages are updated.
  useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);

  return (
    <View style={stylesChat.messagingscreen}>
      <View
        style={[
          stylesChat.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View style={stylesChat.messaginginputContainer}>
        <TextInput
          style={stylesChat.messaginginput}
          onChangeText={(value) => setMessage(value)}
        />
        <TouchableOpacity
          style={stylesChat.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagingScreen;
