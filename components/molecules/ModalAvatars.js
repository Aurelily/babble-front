import { View, Text, Switch, Image } from "react-native";
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

const ModalAvatars = ({
  /*   roomIdToConfim,
  url,
  userToken,
  privateCode,
  name,
  roomInfos, */
  visibleAvatars,
  setVisibleAvatars,
}) => {
  // States
  const [alert, setAlert] = useState("");

  // Function that closes the Modal component
  const closeModal = () => setVisibleAvatars(false);

  return (
    <View style={profilScreenStyle.modalAvatarsContent}>
      <Text
        style={[
          genStyles.basicPurpleText,
          genStyles.boldText,
          genStyles.marginBottomBase,
        ]}
      >
        Ici vous pouvez choisir un nouvel avatar de babbler pour votre profil
      </Text>
      <Text style={[genStyles.msgAlert, genStyles.marginBottomBase]}>
        {alert}
      </Text>

      {/*   <Image
        source={require("../../assets/img/illus-private.png")}
        style={chatScreensStyles.illus}
      /> */}
      <View style={profilScreenStyle.modalbuttonContainer}>
        <BtForm
          action={""}
          text={"Choisir"}
          colorStart={colors.purplePrimary}
          colorEnd={colors.purpleSecondary}
        />
        <BtForm
          action={closeModal}
          text={"Annuler"}
          colorStart={colors.orangePrimary}
          colorEnd={colors.orangeSecondary}
        />
      </View>
    </View>
  );
};

export default ModalAvatars;
