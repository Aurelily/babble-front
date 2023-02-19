import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { stylesChat } from "../../utils/styles";

const ModalChat = ({ setVisible }) => {
  const [groupName, setGroupName] = useState("");

  //👇🏻 Function that closes the Modal component
  const closeModal = () => setVisible(false);

  //👇🏻 Logs the group name to the console
  const handleCreateRoom = () => {
    console.log({ groupName });
    closeModal();
  };
  return (
    <View style={stylesChat.modalContainer}>
      <Text style={stylesChat.modalsubheading}>Enter your Group name</Text>
      <TextInput
        style={stylesChat.modalinput}
        placeholder="Group name"
        onChangeText={(value) => setGroupName(value)}
      />

      <View style={stylesChat.modalbuttonContainer}>
        <Pressable style={stylesChat.modalbutton} onPress={handleCreateRoom}>
          <Text style={stylesChat.modaltext}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[stylesChat.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={closeModal}
        >
          <Text style={stylesChat.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalChat;
