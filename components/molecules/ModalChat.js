import {
  View,
  Text,
  Switch,
  Image,
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
  // Pour le switch RGPD
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // States
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
      if (isEnabled) {
        var roomToCreate = {
          name: groupName,
          creator: userInfos._id,
          dateCreation: new Date(),
          private: true,
        };
      } else {
        var roomToCreate = {
          name: groupName,
          creator: userInfos._id,
          dateCreation: new Date(),
          private: false,
        };
      }

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
      <View style={chatScreensStyles.switchZone}>
        <Switch
          trackColor={{ false: "#767577", true: "#FE9920" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={genStyles.subtitleOrangeText}> Salon privé</Text>
      </View>

      <Image
        source={require("../../assets/img/illus-salon.png")}
        style={chatScreensStyles.illus}
      />
      <View style={[genStyles.totalWidth, genStyles.paddingBase]}>
        <Text style={genStyles.subtitlePurpleText}>Règlement du salon</Text>
        <Text style={genStyles.miniPurpleText}>
          1.Respectez les autres utilisateurs.
        </Text>
        <Text style={genStyles.miniPurpleText}>
          2.Pas de contenu offensant.
        </Text>
        <Text style={genStyles.miniPurpleText}>
          3.Ne partagez pas d'informations personnelles.
        </Text>
        <Text style={genStyles.miniPurpleText}>4.Ne publiez pas de spam.</Text>
        <Text style={genStyles.miniPurpleText}>
          5.Respectez les règles de propriété intellectuelle.
        </Text>
        <Text style={genStyles.miniPurpleText}>6.Pas de langage grossier.</Text>
      </View>
      <View style={[genStyles.paddingBase, genStyles.rowSpaceBetween]}>
        <Image
          source={require("../../assets/img/bt-signal.png")}
          style={chatScreensStyles.btSignal}
        />
        <Text style={genStyles.miniPurpleText}>
          Un bouton “Signaler le salon” sera disponible pour les utilisateurs.
          Au bout de 3 signalements nous nous réservons le droit de supprimer le
          salon signalé.
        </Text>
      </View>
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
