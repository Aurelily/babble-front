import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { stylesChat } from "../../utils/styles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../../utils/socket";

const ModalChat = ({
  setVisible,
  url,
  userInfos,
  setUserInfos,
  userId,
  userToken,
  rooms,
  setRooms,
  fetchGroups,
}) => {
  const [groupName, setGroupName] = useState("");
  const [infosLoading, setInfosLoading] = useState(true);

  useEffect(() => {
    // Function to get all user connected informations
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
    getUserInfos();
  }, [userId]);

  //👇🏻 Function that closes the Modal component
  const closeModal = () => setVisible(false);

  const handleSubmitRoom = async () => {
    if (groupName) {
      // Si tous les champs sont remplis

      var roomToCreate = {
        name: groupName,
        creator: userInfos._id,
        dateCreation: new Date(),
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomToCreate),
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
      setAlert("Indiquer un nom de salon");
    }
    closeModal();
  };

  return (
    <View style={stylesChat.modalContainer}>
      <Text style={stylesChat.modalsubheading}>Enter your Group name</Text>
      <TextInput
        style={stylesChat.modalinput}
        placeholder="Group name"
        onChangeText={(value) => setGroupName(value)}
        defaultValue={groupName}
      />

      <View style={stylesChat.modalbuttonContainer}>
        <TouchableOpacity
          style={stylesChat.modalbutton}
          onPress={handleSubmitRoom}
        >
          <Text style={stylesChat.modaltext}>CREATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesChat.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={closeModal}
        >
          <Text style={stylesChat.modaltext}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalChat;
