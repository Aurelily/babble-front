import { View, Text, Switch, Image } from "react-native";
import React, { useState, useEffect } from "react";

// Import styles and colors
import colors from "../../assets/colors";
import { chatScreensStyles } from "../../styles/chatScreensStyles";
import { genStyles } from "../../styles/genStyles";

// Import components
import InputText from "../atoms/InputText";
import BtForm from "../atoms/BtForm";

// jwt-decode library to decode jwtToken
import jwtDecode from "jwt-decode";

const ModalChat = ({
  setVisible,
  url,
  userInfos,
  setUserInfos,
  userId,
  setUserId,
  userToken,
  rooms,
  fetchGroups,
}) => {
  // Pour le switch RGPD
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // States
  const [groupName, setGroupName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [infosLoading, setInfosLoading] = useState(true);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    /* // Function to get all user connected informations
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
    getUserInfos(); */
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      setUserId(decodedToken.userId);
    }
  }, [userId]);

  // Function that closes the Modal component
  const closeModal = () => setVisible(false);

  // Function to generate random letters private room code
  const generateRandomCode = () => {
    let code = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      code += alphabet.charAt(randomIndex);
    }
    if (rooms.find((room) => room.code === code)) {
      generateRandomCode;
    } else {
      setRoomCode(code);
      return roomCode;
    }
  };

  const handleSubmitRoom = async () => {
    if (groupName) {
      if (isEnabled) {
        var roomToCreate = {
          name: groupName,
          creator: userInfos._id,
          dateCreation: new Date(),
          private: true,
          privateCode: roomCode,
        };
      } else {
        var roomToCreate = {
          name: groupName,
          creator: userInfos._id,
          dateCreation: new Date(),
          private: false,
          privateCode: "",
        };
      }

      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
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

  useEffect(() => {
    if (isEnabled) {
      generateRandomCode();
    }
  }, [isEnabled]);

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
      <View style={chatScreensStyles.switchZone}>
        <Switch
          trackColor={{ false: "#767577", true: "#FE9920" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={genStyles.subtitleOrangeText}> Privé</Text>
      </View>
      {isEnabled ? (
        <>
          <Text style={genStyles.titlePurpleText}>{roomCode}</Text>
          <Text style={genStyles.miniPurpleText}>
            Communiquez ce code aux Babblers que vous voulez inviter dans votre
            salon.
          </Text>
        </>
      ) : (
        <Text></Text>
      )}

      <Image
        source={require("../../assets/img/illus-salon.png")}
        style={chatScreensStyles.illus}
      />

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
