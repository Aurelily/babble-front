import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//import styles

import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";

//👇🏻 Import socket from the socket.js file in utils folder
import { subscribeToRoom } from "../../utils/socket";
import socket from "../../utils/socket";

const ChatComponent = ({
  item,
  roomName,
  setRoomName,
  url,
  userToken,
  userId,
}) => {
  const navigation = useNavigation();

  const [roomCreator, setRoomCreator] = useState("");

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
            console.log(data.data.firstname);
            setRoomCreator(data.data.firstname);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
  //SOCKET NEW CREATOR
  socket.on("newCreator", (creator) => {
    if (item.creator.firstname) {
      setRoomCreator(item.creator.firstname);
    } else {
      setRoomCreator(creator.firstname);
    }
  });

  useEffect(() => {
    getUserCreatorInfos();
  }, []);

  return (
    <Pressable style={chatScreensStyles.component} onPress={handleNavigation}>
      <Image
        source={require("../../assets/img/avatar-defaut.png")}
        style={chatScreensStyles.avatar}
      />

      <View style={chatScreensStyles.cContainer}>
        <View>
          <Text style={chatScreensStyles.cRoomName}>{item.name}</Text>

          <Text style={genStyles.basicPurpleText}>Par : {roomCreator}</Text>
        </View>
        <View>
          <Text style={genStyles.basicPurpleText}>{formattedDate}</Text>
        </View>
      </View>
      <View style={chatScreensStyles.bgOpacity}></View>
    </Pressable>
  );
};

export default ChatComponent;
