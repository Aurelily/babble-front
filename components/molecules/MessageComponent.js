import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";

// Import styles
import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";
import colors from "../../assets/colors";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../../utils/socket";

export default function MessageComponent({
  item,
  userId,
  userToken,
  url,
  rootPath,
}) {
  const [messageCreator, setMessageCreator] = useState("");

  const status = item.id_author._id !== userId;
  const status2 = item.id_author !== userId;

  const dateMessage = new Date(item.datePublished);
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = dateMessage.toLocaleTimeString("fr-FR", options);

  // Function to get user creator info
  async function getMessageAuthorInfos() {
    try {
      await fetch(`${url}users/details/${item.id_author._id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data); // affiche la réponse JSON dans la console du navigateur
          if (data.status == 200) {
            console.log(data.data.firstname);
            setMessageCreator(data.data.firstname);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  //SOCKET NEW MESSAGE AUTHOR
  socket.on("newMessageAuthor", (messageAuthor) => {
    if (item.id_author.firstname) {
      setMessageCreator(item.id_author.firstname);
    } else {
      setMessageCreator(messageAuthor.firstname);
    }
  });

  useEffect(() => {
    getMessageAuthorInfos();
  }, []);

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
          {status && status2 ? (
            <Image
              source={{ uri: rootPath + item.id_author.avatarPath }}
              style={chatScreensStyles.avatar}
            />
          ) : (
            <Image
              source={{ uri: rootPath + item.id_author.avatarPath }}
              style={chatScreensStyles.avatar}
            />
          )}

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
                  ? [genStyles.basicPurpleText, chatScreensStyles.messageAuthor]
                  : [genStyles.basicClearText, chatScreensStyles.messageAuthor]
              }
            >
              Par: {messageCreator}
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
