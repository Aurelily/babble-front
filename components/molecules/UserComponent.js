import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

//import styles

import { usersScreenStyle } from "../../styles/usersScreenStyle";
import { genStyles } from "../../styles/genStyles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../../utils/socket";

const UserComponent = ({ item, url, userToken, userId }) => {
  const navigation = useNavigation();
  const [userInfos, setUserInfos] = useState();
  const [connected, setConnected] = useState(false);

  ///👇🏻 Navigates to the User detail screen
  const handleNavigation = () => {
    navigation.navigate("userDetail", {
      id: item._id,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      avatarPath: item.avatarPath,
    });
  };

  // Function to get user creator info
  async function getUserInfos() {
    try {
      await fetch(`${url}users/details/${item._id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data); // affiche la réponse JSON dans la console du navigateur
          if (data.status == 200) {
            console.log(data.data.firstname);
            console.log(data.data.lastname);
            setUserInfos(data.data);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUserInfos();

    socket.on("user connected", (activeSockets) => {
      console.log(activeSockets);
      const index = activeSockets.indexOf(item._id);
      if (index !== -1) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });

    socket.on("user disconnected", (activeSockets) => {
      const index = activeSockets.indexOf(item._id);
      if (index !== -1) {
        setConnected(false);
      }
    });

    // Clean up function
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Pressable style={usersScreenStyle.component} onPress={handleNavigation}>
        <Image
          source={require("../../assets/img/avatar-defaut.png")}
          style={usersScreenStyle.avatar}
        />

        <View style={usersScreenStyle.cContainer}>
          <View>
            <Text style={usersScreenStyle.cUserName}>
              {item.firstname} {item.lastname}
            </Text>
            <Text>{connected ? "Connected" : "Not Connected"}</Text>
          </View>
        </View>
        <View style={usersScreenStyle.bgOpacity}></View>
      </Pressable>
    </>
  );
};

export default UserComponent;
