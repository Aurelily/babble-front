import * as React from "react";
import { Image, View, Text, SafeAreaView, ImageBackground } from "react-native";

// Import colors ans style
import { genStyles } from "../styles/genStyles";
import { homeScreenStyles } from "../styles/homeScreenStyle";

export default function UserDetailsScreen({
  route,
  url,
  rootPath,
  userToken,
  userId,
  usersInfos,
  setUserInfos,
}) {
  // Access user params
  const { firstname, lastname, avatarPath, id } = route.params;

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/img/fond-bulles-orange4.png")}
        style={homeScreenStyles.bgImage}
      >
        <View style={[homeScreenStyles.container]}>
          <View>
            <Image
              source={{ uri: rootPath + avatarPath }}
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
            {firstname} {lastname}
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
