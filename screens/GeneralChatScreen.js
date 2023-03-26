import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useState } from "react";

//👇🏻 The Modal component
import ModalChat from "../components/molecules/ModalChat";
import ChatComponent from "../components/molecules/ChatComponent";

import { chatScreensStyles } from "../styles/chatScreensStyles";
import { genStyles } from "../styles/genStyles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../utils/socket";
import { socketConnect } from "../utils/socket";
import { socketDisconnect } from "../utils/socket";

export default function GeneralChatScreen({
  url,
  userToken,
  setUserToken,
  userInfos,
  setUserInfos,
  userId,
  roomName,
  setRoomName,
  deleteInStore,
}) {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  //Runs whenever there is new trigger from the backend
  socketConnect();

  async function fetchGroups() {
    try {
      await fetch(`${url}rooms`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setRooms(data.data);
            setRoomsLoading(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  //Runs when the component mounts
  useEffect(() => {
    rooms.sort((a, b) => b.dateCreation - a.dateCreation);
    socket.on("newRoom", (room) => {
      setRooms((rooms) => [...rooms, room]);
    });
    fetchGroups();
  }, []);

  const handleCreateGroup = () => {
    setVisible(true);
  };

  return roomsLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading rooms...</Text>
    </View>
  ) : (
    <SafeAreaView style={chatScreensStyles.container}>
      <ImageBackground
        source={require("../assets/img/fond-bulles-violet4.png")}
        style={chatScreensStyles.bgImage}
      >
        <View style={chatScreensStyles.topZone}>
          <View
            style={[chatScreensStyles.btDecoPos, chatScreensStyles.btLabelZone]}
          >
            <TouchableOpacity
              onPress={() => {
                deleteInStore("jwtToken");
                setUserToken(null);
              }}
              style={genStyles.genCenter}
            >
              <Image
                source={require("../assets/img/bt-deco.png")}
                style={chatScreensStyles.btOrange}
              />
              <Text style={genStyles.basicClearText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../assets/img/couple-orange.png")}
            style={chatScreensStyles.coupleOrange}
          />
          <View
            style={[chatScreensStyles.btAddPos, chatScreensStyles.btLabelZone]}
          >
            <TouchableOpacity
              style={genStyles.genCenter}
              onPress={handleCreateGroup}
            >
              <Image
                source={require("../assets/img/bt-add-room.png")}
                style={chatScreensStyles.btOrange}
              />
              <Text style={genStyles.basicClearText}>Créer un salon</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={chatScreensStyles.chatlistContainer}>
          {rooms.length > 0 ? (
            <FlatList
              data={rooms}
              renderItem={({ item }) => (
                <ChatComponent
                  item={item}
                  roomName={roomName}
                  setRoomName={setRoomName}
                  url={url}
                  userToken={userToken}
                  userId={userId}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled={true}
              scrollEnabled={true}
              style={chatScreensStyles.flatlistContainer}
            />
          ) : (
            <View
              style={[
                chatScreensStyles.chatemptyContainer,
                genStyles.genCenter,
              ]}
            >
              <Text
                style={[genStyles.titleClearText, genStyles.textAlignCenter]}
              >
                Il n'y a aucun salon actif actuellement!
              </Text>
              <Text
                style={[genStyles.basicClearText, genStyles.textAlignCenter]}
              >
                Cliquez sur "Créer un salon" pour créer le vôtre.
              </Text>
            </View>
          )}
        </View>
        {visible ? (
          <ModalChat
            setVisible={setVisible}
            url={url}
            userInfos={userInfos}
            userId={userId}
            userToken={userToken}
            setUserInfos={setUserInfos}
            rooms={rooms}
            setRooms={setRooms}
          />
        ) : (
          ""
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}
