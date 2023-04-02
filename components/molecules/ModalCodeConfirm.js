import { View, Text, Switch, Image } from "react-native";
import React, { useState, useEffect } from "react";

// Import styles and colors
import colors from "../../assets/colors";
import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";

// Import components
import InputText from "../atoms/InputText";
import BtForm from "../atoms/BtForm";

const ModalCodeConfirm = ({
  setVisibleCodeConf,
  roomIdToConfim,
  url,
  userToken,
  rooms,
}) => {
  // States
  const [groupName, setGroupName] = useState("");
  const [roomCodeUse, setRoomCodeUse] = useState("");
  const [infosLoading, setInfosLoading] = useState(true);
  const [alert, setAlert] = useState("");

  // Function that closes the Modal component
  const closeModal = () => setVisibleCodeConf(false);

  const handleValidCode = async () => {
    console.log("ValidCode ?" + roomIdToConfim);
  };

  /*   useEffect(() => {
    if (isEnabled) {
      generateRandomCode();
    }
  }, [isEnabled]); */

  return (
    <View style={chatScreensStyles.formContent}>
      <Text style={[genStyles.titlePurpleText, chatScreensStyles.titleModal]}>
        Ce salon est privé. Veuillez entrer le code que son créateur vous a
        communiqué
      </Text>

      <InputText
        placeholder="ENTREZ LE CODE ICI"
        value={roomCodeUse}
        setValue={setRoomCodeUse}
      />
      <Text style={genStyles.msgAlert}>{alert}</Text>

      <Image
        source={require("../../assets/img/illus-salon.png")}
        style={chatScreensStyles.illus}
      />

      <View style={chatScreensStyles.modalbuttonContainer}>
        <BtForm
          action={handleValidCode}
          text={"Valider le code"}
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

export default ModalCodeConfirm;
