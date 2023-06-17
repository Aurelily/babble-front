import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";

// Import styles
import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";

//Import socket from the socket.js file in utils folder
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

  // Function to get message creator info
  async function getMessageAuthorInfos() {
    try {
      await fetch(`${url}users/details/${item.id_author._id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setMessageCreator(data.data.firstname);
          }
        });
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  //Socket : new message creator infos
  socket.on("newMessageAuthor", (messageAuthor) => {
    if (item.id_author.firstname) {
      setMessageCreator(item.id_author.firstname);
    } else {
      setMessageCreator(messageAuthor.firstname);
    }
  });
  socket.on("deleteUser", (user) => {
    if (item.id_author === user._id) {
      setMessageCreator("unkwown");
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
        <View>
          {status && status2 ? (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: rootPath + item.id_author.avatarPath }}
                  style={chatScreensStyles.mavatarYou}
                />
                <View style={chatScreensStyles.messageOther}>
                  <Text style={genStyles.basicPurpleText}>{item.content}</Text>
                </View>
              </View>
              <View style={[chatScreensStyles.messageInfosOther]}>
                <Text style={[genStyles.basicPurpleText]}>
                  Par: {messageCreator} à :
                </Text>
                <Text style={[genStyles.basicPurpleText]}>{formattedDate}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={chatScreensStyles.messageCreator}>
                  <Text style={genStyles.basicClearText}>{item.content}</Text>
                </View>
                <Image
                  source={{ uri: rootPath + item.id_author.avatarPath }}
                  style={chatScreensStyles.mavatarMe}
                />
              </View>
              <View style={[chatScreensStyles.messageInfosMe]}>
                <Text style={[genStyles.basicPurpleText]}>
                  Par: {messageCreator} à :
                </Text>
                <Text style={[genStyles.basicPurpleText]}>{formattedDate}</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
