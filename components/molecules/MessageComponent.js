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
          if (data.status == 200) {
            setMessageCreator(data.data.firstname);
          }
        });
      });
    } catch (e) {
      console.log(e.message);
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
            <>
              <Image
                source={{ uri: rootPath + item.id_author.avatarPath }}
                style={chatScreensStyles.mavatarYou}
              />
              <View style={chatScreensStyles.messageOther}>
                <Text style={genStyles.basicPurpleText}>{item.content}</Text>
                <Text
                  style={[
                    genStyles.basicPurpleText,
                    chatScreensStyles.messageAuthor,
                  ]}
                >
                  Par: {messageCreator}
                </Text>
                <Text
                  style={[
                    genStyles.basicPurpleText,
                    chatScreensStyles.messageDate,
                  ]}
                >
                  {formattedDate}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={chatScreensStyles.messageCreator}>
                <Text style={genStyles.basicClearText}>{item.content}</Text>
                <Text
                  style={[
                    genStyles.basicClearText,
                    chatScreensStyles.messageAuthor,
                  ]}
                >
                  Par: {messageCreator}
                </Text>
                <Text
                  style={[
                    genStyles.basicClearText,
                    chatScreensStyles.messageDate,
                  ]}
                >
                  {formattedDate}
                </Text>
              </View>
              <Image
                source={{ uri: rootPath + item.id_author.avatarPath }}
                style={chatScreensStyles.mavatarMe}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}
