import { View, Text, Switch, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

// To leave the room if cancel
import { leaveRoom } from "../../utils/socket";

// Import styles and colors
import colors from "../../assets/colors";
import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";

// Import components
import InputText from "../atoms/InputText";
import BtForm from "../atoms/BtForm";

const ModalCodeConfirm = ({
  roomIdToConfim,
  url,
  userToken,
  privateCode,
  setVisibleCodeConf,
}) => {
  // States
  const [roomCodeUse, setRoomCodeUse] = useState("");
  const [roomInfos, setRoomInfos] = useState();
  const [alert, setAlert] = useState("");

  const navigation = useNavigation();

  // Function that closes the Modal component
  const closeModal = () => setVisibleCodeConf(false);

  // Function to get all user connected informations
  async function getRoomInfos() {
    try {
      await fetch(`${url}rooms/details/${roomIdToConfim}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setRoomInfos(data.data);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleValidCode = async () => {
    if (privateCode === roomCodeUse) {
      closeModal();
    } else {
      setAlert(
        "Il vous faut entrer ci-dessous un code valide composé de 6 lettres majuscules. "
      );
    }
  };

  return (
    <View style={chatScreensStyles.modalCodeContent}>
      <Text style={[genStyles.titlePurpleText, genStyles.boldText]}>
        Ce salon est privé.
      </Text>
      <Text style={[genStyles.msgAlert, genStyles.marginBottomBase]}>
        {alert}
      </Text>

      <InputText
        placeholder="ENTREZ LE CODE ICI"
        value={roomCodeUse}
        setValue={setRoomCodeUse}
      />

      <Text
        style={[
          genStyles.basicPurpleText,
          genStyles.boldText,
          genStyles.marginBottomBase,
        ]}
      >
        Veuillez entrer le code que son créateur vous a communiqué. Si vous n'en
        avez pas ressortez vers la liste des salons.
      </Text>

      <View style={chatScreensStyles.modalOneButtonContainer}>
        <BtForm
          action={handleValidCode}
          text={"Valider le code"}
          colorStart={colors.purplePrimary}
          colorEnd={colors.purpleSecondary}
        />
      </View>
      <Image
        source={require("../../assets/img/illus-salon.png")}
        style={chatScreensStyles.illus}
      />
    </View>
  );
};

export default ModalCodeConfirm;
