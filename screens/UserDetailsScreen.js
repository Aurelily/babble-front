import * as React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
} from "react-native";

// Import colors ans style
import colors from "../assets/colors";
import { usersScreenStyle } from "../styles/usersScreenStyle";
import { genStyles } from "../styles/genStyles";
import { homeScreenStyles } from "../styles/homeScreenStyle";

//Components :
import BtForm from "../components/atoms/BtForm";

export default function UserDetailsScreen({
  route,
  url,
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
              source={require("../assets/img/avatar-defaut.png")}
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

          {/*           <View style={homeScreenStyles.buttonsContent}>
            <BtForm
              action={() => {
                console.log("favoris");
              }}
              text={"Ajouter aux favoris"}
              colorStart={colors.orangePrimary}
              colorEnd={colors.orangeSecondary}
            />
          </View> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
