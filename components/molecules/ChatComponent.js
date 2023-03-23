import { View, Text, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { stylesChat } from "../../utils/styles";

//👇🏻 Import socket from the socket.js file in utils folder
import { subscribeToRoom } from "../../utils/socket";
import socket from "../../utils/socket";

const ChatComponent = ({ item, roomName, setRoomName, url, userToken }) => {
  const navigation = useNavigation();

  const [roomCreator, setRoomCreator] = useState("");
  const [roomCreator2, setRoomCreator2] = useState("");

  const dateRoomCreation = new Date(item.dateCreation);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = dateRoomCreation.toLocaleTimeString("fr-FR", options);

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    subscribeToRoom(item.name);
    setRoomName(item.name);
    navigation.navigate("messages", {
      id: item._id,
      name: item.name,
      creator: item.creator,
      dateCreation: item.dateCreation,
    });
  };

  // Function to get user creator info
  async function getUserCreatorInfos() {
    try {
      await fetch(`${url}users/details/${item.creator._id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data); // affiche la réponse JSON dans la console du navigateur
          if (data.status == 200) {
            console.log("POPO1");
            console.log(data.data.firstname);
            setRoomCreator(data.data.firstname);
          }
        });
        return roomCreator;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserCreatorInfos2(creatorId) {
    try {
      await fetch(`${url}users/details/${creatorId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data); // affiche la réponse JSON dans la console du navigateur
          if (data.status == 200) {
            console.log("POPO2");
            console.log(data.data.firstname);
            setRoomCreator2(data.data.firstname);
          }
        });
        return roomCreator2;
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    socket.on("newCreator", getUserCreatorInfos);
    getUserCreatorInfos();
  }, []);

  return (
    <Pressable style={stylesChat.cchat} onPress={handleNavigation}>
      <Ionicons
        name="person-circle-outline"
        size={45}
        color="black"
        style={stylesChat.cavatar}
      />

      <View style={stylesChat.crightContainer}>
        <View>
          <Text style={stylesChat.cusername}>{item.name}</Text>

          <Text style={stylesChat.cmessage}>Par : {roomCreator}</Text>
        </View>
        <View>
          <Text style={stylesChat.ctime}>{formattedDate}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
