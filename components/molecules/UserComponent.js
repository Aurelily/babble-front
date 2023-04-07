import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

//import styles

import { usersScreenStyle } from "../../styles/usersScreenStyle";
import { genStyles } from "../../styles/genStyles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../../utils/socket";

const UserComponent = ({ item, url, rootPath, userToken, userId }) => {
  const navigation = useNavigation();
  const [userInfos, setUserInfos] = useState();
  /*  const [online, setOnline] = useState(false); */

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
          if (data.status == 200) {
            setUserInfos(data.data);
          }
        });
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <>
      <Pressable style={usersScreenStyle.component} onPress={handleNavigation}>
        <Image
          source={{ uri: rootPath + item.avatarPath }}
          style={usersScreenStyle.avatar}
        />

        <View style={usersScreenStyle.cContainer}>
          <View>
            <Text style={usersScreenStyle.cUserName}>
              {item.firstname} {item.lastname}
            </Text>
            {/*  <Text>{online ? "Connected" : "Not Connected"}</Text> */}
          </View>
        </View>
        <View style={usersScreenStyle.bgOpacity}></View>
      </Pressable>
    </>
  );
};

export default UserComponent;
