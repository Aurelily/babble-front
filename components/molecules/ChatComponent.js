import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

//import styles

import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";

// import component
import ModalDelete from "./ModalDelete";

//👇🏻 Import socket from the socket.js file in utils folder
import { subscribeToRoom } from "../../utils/socket";
import socket from "../../utils/socket";

const ChatComponent = ({
  item,
  roomName,
  setRoomName,
  setRoomIdToDelete,
  url,
  rootPath,
  userToken,
  userId,
  setVisibleDel,
  setRoomIdToConfirm,
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

  // Open confirm modal, delete room and navigates to the Roomlist screen
  const handleDelete = () => {
    console.log("DELETE ?" + item._id);
    setRoomIdToDelete(item._id);
    setVisibleDel(true);
  };

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    subscribeToRoom(item.name);
    setRoomName(item.name);
    navigation.navigate("messages", {
      id: item._id,
      name: item.name,
      creator: item.creator,
      dateCreation: item.dateCreation,
      privateCode: item.privateCode,
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
    <>
      <Pressable style={chatScreensStyles.component} onPress={handleNavigation}>
        <Image
          source={{ uri: rootPath + item.creator.avatarPath }}
          style={chatScreensStyles.avatar}
        />
        {item.privateCode ? (
          <Image
            source={require("../../assets/img/private-room.png")}
            style={[chatScreensStyles.privateImg]}
          />
        ) : (
          <Text></Text>
        )}
        <View style={chatScreensStyles.cContainer}>
          <View>
            <Text style={chatScreensStyles.cRoomName}>{item.name}</Text>

            <Text style={genStyles.basicPurpleText}>Par : {roomCreator}</Text>
          </View>
          <View>
            <Text style={genStyles.basicPurpleText}>{formattedDate}</Text>

            {userId === item.creator._id ? (
              <TouchableOpacity
                onPress={handleDelete}
                style={[genStyles.rowSpaceBetween, genStyles.genCenter]}
              >
                <Image
                  source={require("../../assets/img/bt-delete.png")}
                  style={[chatScreensStyles.btLeave]}
                />
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </View>
        </View>
        <View style={chatScreensStyles.bgOpacity}></View>
      </Pressable>
    </>
  );
};

export default ChatComponent;
