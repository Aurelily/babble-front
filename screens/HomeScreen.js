import * as React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
} from "react-native";

// jwt-decode library to decode jwtToken
import jwtDecode from "jwt-decode";

//Components :
import BtForm from "../components/atoms/BtForm";

//Colors:
import colors from "../assets/colors";
import { genStyles } from "../styles/genStyles";
import { homeScreenStyles } from "../styles/homeScreenStyle";

//UseNavigation : to use link toward other screens
import { useNavigation } from "@react-navigation/core";

import socket from "../utils/socket";

export default function HomeScreen({
  url,
  rootPath,
  userId,
  setUserId,
  setUserToken,
  userToken,
  userInfos,
  setUserInfos,
  deleteInStore,
}) {
  const navigation = useNavigation();

  // States :
  const [infosLoading, setInfosLoading] = useState(true);

  useEffect(() => {
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      setUserId(decodedToken.userId);
    }
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
        console.log(e.message);
      }
    }
    getUserInfos();
  }, [userId]);

  return infosLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading ...{userId}</Text>
      <TouchableOpacity
        onPress={() => {
          deleteInStore("jwtToken");
          setUserToken(null);
        }}
      >
        <Text>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/img/fond-bulles-violet2.png")}
        style={homeScreenStyles.bgImage}
      >
        <View style={[homeScreenStyles.container]}>
          <View>
            <Image
              source={{ uri: rootPath + userInfos.avatarPath }}
              style={homeScreenStyles.avatar}
            />
          </View>
          <Text
            style={[
              genStyles.titleClearText,
              genStyles.textAlignCenter,
              homeScreenStyles.marginBottomLarge,
            ]}
          >
            Bienvenue {userInfos.firstname} !
          </Text>
          <Text
            style={[
              genStyles.basicClearText,
              genStyles.textContainerWidth,
              genStyles.textAlignCenter,
              homeScreenStyles.marginBottomMedium,
              genStyles.boldText,
            ]}
          >
            Vous pouvez maintenant accéder aux salons de discussions, mais aussi
            papoter avec d'autres babblers dans des salon privés ou publics.
            Vous pouvez également modifier votre avatar ou les informations de
            votre profil.
          </Text>
          <View style={homeScreenStyles.buttonsContent}>
            <BtForm
              action={() => {
                navigation.navigate("Discussion");
              }}
              text={"Entrez dans la discussion"}
              colorStart={colors.orangePrimary}
              colorEnd={colors.orangeSecondary}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
