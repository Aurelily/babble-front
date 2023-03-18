import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { stylesChat } from "../../utils/styles";

const ChatComponent = ({ item }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState({});

  //👇🏻 Retrieves the last message in the array from the item prop
  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    navigation.navigate("messages", {
      id: item._id,
      name: item.name,
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

          <Text style={stylesChat.cmessage}>
            {messages?.content ? messages.content : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={stylesChat.ctime}>
            {messages?.datePublished ? messages.datePublished : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
