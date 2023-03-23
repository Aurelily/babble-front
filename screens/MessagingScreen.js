import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

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
  const [roomInfos, setRoomInfos] = useState();
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

  // Function to get connected user info
  async function getUserInfos() {
    try {
      await fetch(`${url}users/details/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setUserInfos(data.data);
            setInfosLoading(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchMessagesByRoomId() {
    try {
      await fetch(`${url}messages/room/${id}`, {
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
      console.log(roomInfos);

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
        await fetch(`${url}messages/post`, requestOptions).then((response) => {
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

  //👇🏻 This runs when the messages are updated.
  useEffect(() => {
    navigation.setOptions({ title: name });
    socket.on("newMessage", (content) => {
      if (id === content.id_room) {
        setChatMessages((chatMessages) => [...chatMessages, content]);
      }
    });
    getUserInfos();
    getRoomInfos();
    fetchMessagesByRoomId();
    console.log(chatMessages);
  }, []);

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
              <MessageComponent item={item} userId={userId} />
            )}
            keyExtractor={(item, index) => {
              return index;
            }}
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
