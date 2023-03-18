import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { stylesChat } from "../../utils/styles";

const ChatComponent = ({ item }) => {
  const navigation = useNavigation();

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    navigation.navigate("messages", {
      id: item._id,
      name: item.name,
      creator: item.creator,
      dateCreation: item.dateCreation,
    });
  };

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

          <Text style={stylesChat.cmessage}>Tap to start chatting</Text>
        </View>
        <View>
          <Text style={stylesChat.ctime}>{item.dateCreation}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
