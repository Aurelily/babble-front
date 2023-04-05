import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";

//Import components
import MessageComponent from "../components/molecules/MessageComponent";
import InputText from "../components/atoms/InputText";
import ModalCodeConfirm from "../components/molecules/ModalCodeConfirm";

//Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAvoidingView, Platform } from "react-native";

//Import styles
import { chatScreensStyles } from "../styles/chatScreensStyles";
import { genStyles } from "../styles/genStyles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../utils/socket";
import { socketConnect } from "../utils/socket";
import { leaveRoom } from "../utils/socket";

const MessagingScreen = ({
  route,
  navigation,
  userId,
  url,
  rootPath,
  userToken,
  userInfos,
  setUserInfos,
  roomInfos,
  setRoomInfos,
}) => {
  const [message, setMessage] = useState("");
  const [messagesLoading, setMessageLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  /* const [roomInfos, setRoomInfos] = useState("defaut"); */
  const [infosLoading, setInfosLoading] = useState(true);
  const [visibleCodeConf, setVisibleCodeConf] = useState(false);

  /*   //Runs whenever there is new trigger from the backend
  socketConnect(); */

  // Access the chat component params
  const { name, id, privateCode, creator } = route.params;

  // Pour le scrollToEnd de la Flatlist
  const flatList = React.useRef(null);

  // Function to get all user connected informations
  const getRoomInfos = async () => {
    try {
      fetch(`${url}rooms/details/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            console.log("dans getRoomInfos :");
            setRoomInfos(data.data);
            console.log(roomInfos);
            setInfosLoading(false);
            console.log(infosLoading);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  async function fetchMessagesByRoomId() {
    try {
      await fetch(`${url}messages/room/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setChatMessages(data.data);
            setMessageLoading(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmitMessage = async () => {
    if (message) {
      // Si tous les champs sont remplis
      console.log(roomInfos);

      var messageToCreate = {
        id_room: roomInfos._id,
        content: message,
        id_author: userInfos._id,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageToCreate),
      };
      try {
        await fetch(`${url}messages/post`, requestOptions).then((response) => {
          response.json().then((data) => {
            if (data.status == 200) {
              console.log(data.status);
              setMessage("");
            }
          });
        });
      } catch (e) {
        console.log(e.message);
      }
    } else {
      // Si tous les champs ne sont pas remplis
      console.log("Indiquer un message");
    }
  };

  // Socket Events listener
  socket.on("newMessage", (content) => {
    fetchMessagesByRoomId();
    if (id === content.id_room) {
      setChatMessages((chatMessages) => [...chatMessages, content]);
    }
  });
  socket.on("deleteRoom", (room) => {
    leaveRoom(room.name);
    navigation.navigate("roomsList");
  });

  //👇🏻 This runs when the messages are updated.
  useEffect(() => {
    navigation.setOptions({ title: name });
    if (privateCode) {
      setVisibleCodeConf(true);
    }
    /* getUserInfos(); */
    getRoomInfos();
    console.log("Dans le useEffect");
    console.log(privateCode);
    fetchMessagesByRoomId();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "position"}
      style={chatScreensStyles.keyboardAvoidingContainer}
    >
      <ImageBackground
        source={require("../assets/img/fond-bulles-violet5.png")}
        style={chatScreensStyles.bgImage}
      >
        {visibleCodeConf && userId !== creator._id ? (
          <ModalCodeConfirm
            setVisibleCodeConf={setVisibleCodeConf}
            url={url}
            userToken={userToken}
            privateCode={privateCode}
            name={name}
            /*             roomInfos={roomInfos} */
          />
        ) : (
          ""
        )}
        <View style={chatScreensStyles.messagingscreenContainer}>
          <View style={[chatScreensStyles.messagingscreen]}>
            {chatMessages[0] ? (
              <FlatList
                ref={flatList}
                onContentSizeChange={() => {
                  flatList.current.scrollToEnd();
                }}
                data={chatMessages}
                renderItem={({ item }) => (
                  <MessageComponent
                    item={item}
                    url={url}
                    rootPath={rootPath}
                    userId={userId}
                    userToken={userToken}
                  />
                )}
                keyExtractor={(item, index) => {
                  return index;
                }}
                nestedScrollEnabled={true}
                scrollEnabled={true}
                style={chatScreensStyles.flatlistMessagesContainer}
              />
            ) : (
              <Text></Text>
            )}
          </View>

          <View style={chatScreensStyles.messaginginputContainer}>
            <InputText
              placeholder="Message"
              value={message}
              setValue={setMessage}
            />
            <TouchableOpacity
              style={chatScreensStyles.messagingbuttonContainer}
              onPress={handleSubmitMessage}
            >
              <Image
                source={require("../assets/img/bt-send.png")}
                style={chatScreensStyles.btOrangeFlat}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default MessagingScreen;
