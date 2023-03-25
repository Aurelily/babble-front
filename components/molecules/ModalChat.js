import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

// Import styles and colors
import colors from "../../assets/colors";
import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";

// Import components
import InputText from "../atoms/InputText";
import BtForm from "../atoms/BtForm";

const ModalChat = ({
  setVisible,
  url,
  userInfos,
  setUserInfos,
  userId,
  userToken,
  rooms,
  setRooms,
  fetchGroups,
}) => {
  const [groupName, setGroupName] = useState("");
  const [infosLoading, setInfosLoading] = useState(true);
  const [alert, setAlert] = useState("");

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

  // Function that closes the Modal component
  const closeModal = () => setVisible(false);

  const handleSubmitRoom = async () => {
    if (groupName) {
      var roomToCreate = {
        name: groupName,
        creator: userInfos._id,
        dateCreation: new Date(),
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomToCreate),
      };
      try {
        await fetch(`${url}rooms/post`, requestOptions).then((response) => {
          response.json().then((data) => {
            if (data.status == 200) {
              console.log(data.status);
            }
          });
        });
      } catch (e) {
        console.log(e.message);
      }
      closeModal();
    } else {
      setAlert("Indiquer un nom de salon");
    }
  };

  return (
    <View style={chatScreensStyles.formContent}>
      <Text style={[genStyles.titlePurpleText, chatScreensStyles.titleModal]}>
        Entrez le nom de votre salon
      </Text>

      <InputText
        placeholder="Nom du salon"
        value={groupName}
        setValue={setGroupName}
      />
      <Text style={genStyles.msgAlert}>{alert}</Text>
      <View style={chatScreensStyles.modalbuttonContainer}>
        <BtForm
          action={handleSubmitRoom}
          text={"Créer le salon"}
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

export default ModalChat;
