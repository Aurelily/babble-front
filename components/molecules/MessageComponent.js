import { View, Text, Image } from "react-native";
import React from "react";

// Import styles
import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";
import colors from "../../assets/colors";

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
            ? chatScreensStyles.mmessageWrapper
            : [chatScreensStyles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/img/avatar-defaut.png")}
            style={chatScreensStyles.avatar}
          />
          <View
            style={
              status && status2
                ? chatScreensStyles.messageOther
                : chatScreensStyles.messageCreator
            }
          >
            <Text
              style={
                status && status2
                  ? genStyles.basicPurpleText
                  : genStyles.basicClearText
              }
            >
              {item.content}
            </Text>
            <Text
              style={
                status && status2
                  ? [genStyles.basicPurpleText, chatScreensStyles.messageDate]
                  : [genStyles.basicClearText, chatScreensStyles.messageDate]
              }
            >
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
