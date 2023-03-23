import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { stylesChat } from "../../utils/styles";

export default function MessageComponent({ item, userId }) {
  const status = item.id_author._id !== userId;
  const status2 = item.id_author !== userId;

  const dateMessage = new Date(item.datePublished);
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = dateMessage.toLocaleTimeString("fr-FR", options);

  return (
    <View>
      <View
        style={
          status && status2
            ? stylesChat.mmessageWrapper
            : [stylesChat.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="black"
            style={stylesChat.mavatar}
          />
          <View
            style={
              status && status2
                ? stylesChat.mmessage
                : [
                    stylesChat.mmessage,
                    { backgroundColor: "rgb(194, 243, 194)" },
                  ]
            }
          >
            <Text>{item.content}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 40 }}>{formattedDate}</Text>
      </View>
    </View>
  );
}
