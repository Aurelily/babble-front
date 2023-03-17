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

const MessagingScreen = ({
  route,
  navigation,
  userId,
  url,
  userToken,
  userInfos,
  setUserInfos,
}) => {
  const [message, setMessage] = useState("");
  const [messagesLoading, setMessageLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [roomInfos, setRoomInfos] = useState([]);
  const [infosLoading, setInfosLoading] = useState(true);

  //👇🏻 Access the chatroom's name and id
  const { name, id } = route.params;

  // Function to get all user connected informations
  async function getRoomInfos() {
    try {
      await fetch(`${url}rooms/details/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setRoomInfos(data.data);
            setInfosLoading(false);
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
  /*   const handleNewMessage = () => {
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
  }; */

  async function fetchMessages() {
    try {
      await fetch(`${url}messages`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setChatMessages(data.data);
            setMessageLoading(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmitMessage = async () => {
    if (message) {
      // Si tous les champs sont remplis

      var messageToCreate = {
        id_room: roomInfos._id,
        content: message,
        id_author: userInfos._id,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageToCreate),
      };
      try {
        await fetch(`${url}rooms/post`, requestOptions).then((response) => {
          response.json().then((data) => {
            if (data.status == 200) {
              console.log(data.status);
            }
          });
        });
      } catch (e) {
        console.log(e.message);
      }
    } else {
      // Si tous les champs ne sont pas remplis
      setAlert("Indiquer un message");
    }
  };

  //👇🏻 Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
    /*     getUserInfos(); */
  }, []);

  //👇🏻 This runs when the messages are updated.
  useEffect(() => {
    socket.on("newMessage", (message) => {
      setRooms((chatMessages) => [...chatMessages, message]);
    });
    getRoomInfos();
    fetchMessages();
  }, [userId]);

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
          defaultValue={message}
        />
        <TouchableOpacity
          style={stylesChat.messagingbuttonContainer}
          onPress={handleSubmitMessage}
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
