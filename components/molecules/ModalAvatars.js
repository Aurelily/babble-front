import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

// To leave the room if cancel
import { leaveRoom } from "../../utils/socket";

// Import styles and colors
import colors from "../../assets/colors";
import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { profilScreenStyle } from "../../styles/profilScreenStyle";
import { genStyles } from "../../styles/genStyles";

// Import components
import InputText from "../atoms/InputText";
import BtForm from "../atoms/BtForm";
import AvatarList from "../atoms/AvatarsList";

const ModalAvatars = ({
  /*   roomIdToConfim,
  url,
  userToken,
  privateCode,
  name,
  roomInfos, */
  visibleAvatars,
  setVisibleAvatars,
  userInfos,
  rootPath,
  avatarPath,
  setAvatarPath,
}) => {
  // States
  const [alert, setAlert] = useState("");
  const numAvatars = 24;

  // Function that closes the Modal component
  const closeModal = () => setVisibleAvatars(false);

  // Cancellation action
  const handleCancel = () => {
    closeModal();
    setAvatarPath(userInfos.avatarPath);
  };

  // Choice action
  const handleChoice = () => {
    closeModal();
    setAvatarPath(avatarPath);
  };

  return (
    <View style={profilScreenStyle.modalAvatarsContent}>
      <Text style={[genStyles.basicPurpleText, genStyles.boldText]}>
        Ici vous pouvez choisir un nouvel avatar !
      </Text>
      <Text style={[genStyles.basicPurpleText, genStyles.boldText]}>
        Cliquez sur l'avatar de votre choix.
      </Text>
      {/*    <Text style={[genStyles.msgAlert, genStyles.marginBottomBase]}>
        {alert}
      </Text> */}

      <Image
        source={{ uri: rootPath + avatarPath }}
        style={profilScreenStyle.avatar}
      />
      <Text>{avatarPath}</Text>
      <View style={profilScreenStyle.avatarTableContainer}>
        <AvatarList
          rootPath={rootPath}
          avatarPath={avatarPath}
          setAvatarPath={setAvatarPath}
        />
      </View>
      <View style={profilScreenStyle.modalbuttonContainer}>
        <BtForm
          action={handleChoice}
          text={"Choisir"}
          colorStart={colors.purplePrimary}
          colorEnd={colors.purpleSecondary}
        />
        <BtForm
          action={handleCancel}
          text={"Annuler"}
          colorStart={colors.orangePrimary}
          colorEnd={colors.orangeSecondary}
        />
      </View>
    </View>
  );
};

export default ModalAvatars;
