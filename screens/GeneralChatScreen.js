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
import ModalDelete from "../components/molecules/ModalDelete";
import ModalCodeConfirm from "../components/molecules/ModalCodeConfirm";

import { chatScreensStyles } from "../styles/chatScreensStyles";
import { genStyles } from "../styles/genStyles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../utils/socket";

export default function GeneralChatScreen({
  url,
  rootPath,
  userToken,
  setUserToken,
  userInfos,
  setUserInfos,
  userId,
  setUserId,
  roomName,
  setRoomName,
  deleteInStore,
  handleDelete,
}) {
  const [visible, setVisible] = useState(false);
  const [visibleDel, setVisibleDel] = useState(false);
  const [visibleCodeConf, setVisibleCodeConf] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomIdToDelete, setRoomIdToDelete] = useState();
  const [roomIdToConfim, setRoomIdToConfirm] = useState();

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
      console.log(e.message);
    }
  }

  // Get and sort rooms by creation date in descending order
  socket.on("deleteUser", (user) => {
    if (item.id_author === user._id) {
      setMessageCreator("unkwown");
    }
    fetchGroups();
  });
  useEffect(() => {
    socket.on("newRoom", (room) => {
      setRooms((rooms) =>
        [...rooms, room].sort((a, b) => {
          if (a.dateCreation > b.dateCreation) {
            return -1;
          }
          if (a.dateCreation < b.dateCreation) {
            return 1;
          }
          return 0;
        })
      );
    });
    socket.on("deleteRoom", (room) => {
      setRooms((rooms) => rooms.filter((r) => r.id !== room.id));
      fetchGroups();
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
          ></View>
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
              <Text style={[genStyles.basicClearText, genStyles.boldText]}>
                Créer un salon
              </Text>
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
                  rootPath={rootPath}
                  userToken={userToken}
                  userId={userId}
                  setVisibleDel={setVisibleDel}
                  setRoomIdToDelete={setRoomIdToDelete}
                  setRoomIdToConfirm={setRoomIdToConfirm}
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
        {visibleDel ? (
          <ModalDelete
            url={url}
            userToken={userToken}
            setVisibleDel={setVisibleDel}
            roomIdToDelete={roomIdToDelete}
          />
        ) : (
          ""
        )}
        {visible ? (
          <ModalChat
            setVisible={setVisible}
            url={url}
            userInfos={userInfos}
            userId={userId}
            setUserId={setUserId}
            userToken={userToken}
            setUserInfos={setUserInfos}
            rooms={rooms}
          />
        ) : (
          ""
        )}
        {visibleCodeConf ? (
          <ModalCodeConfirm
            setVisibleCodeConf={setVisibleCodeConf}
            roomIdToConfim={roomIdToConfim}
            url={url}
            userToken={userToken}
            rooms={rooms}
          />
        ) : (
          ""
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}
