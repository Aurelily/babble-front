import * as React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function HomeScreen({ url, userId, userToken }) {
  //dPour stocker les infos utilisateurs
  const [userInfos, setUserInfos] = useState();
  const [infosLoading, setInfosLoading] = useState(true);

  useEffect(() => {
    // Function to get all user connected informations
    async function getUserInfos() {
      try {
        await fetch(`${url}users/details/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }).then((response) => {
          response.json().then((data) => {
            if (data.status == 200) {
              setUserInfos(data.data);
              setInfosLoading(false);
            }
          });
        });
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfos();
  }, [userId]);

  return infosLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading ...</Text>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screen Home : connexion confirmée pour le user ID : {userId} </Text>
      <View style={homeScreenStyles.container}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/lilycloud/image/upload/v1675756437/babble/users/avatar-default_tpd0vq.jpg",
          }}
          style={homeScreenStyles.avatar}
        />
      </View>
      <Text>Bienvenue {userInfos.firstname}</Text>
    </View>
  );
}

const homeScreenStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },

  avatar: {
    width: 400,
    height: 400,
    marginLeft: -100,
    marginTop: -100,
  },
});
