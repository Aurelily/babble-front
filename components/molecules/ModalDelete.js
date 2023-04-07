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
import BtForm from "../atoms/BtForm";

const ModalDelete = ({ setVisibleDel, roomIdToDelete, userToken, url }) => {
  // Function that closes the Modal component
  const closeModal = () => setVisibleDel(false);

  const handleDeleteRoom = async () => {
    try {
      const response = await fetch(`${url}rooms/delete/${roomIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Room deleted successfully");
      } else {
        console.log("Error deleting room");
      }
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  return (
    <View style={chatScreensStyles.formContent}>
      <Text style={[genStyles.titlePurpleText, chatScreensStyles.titleModal]}>
        Etes vous sure de vouloir supprimer ce salon ? :
      </Text>
      <Text style={[genStyles.titlePurpleText, chatScreensStyles.titleModal]}>
        {roomIdToDelete}
      </Text>

      <Image
        source={require("../../assets/img/illus-delete.png")}
        style={chatScreensStyles.illus}
      />
      <View style={[genStyles.totalWidth, genStyles.paddingBase]}>
        <Text style={genStyles.subtitlePurpleText}>Attention :</Text>
        <Text style={genStyles.basicPurpleText}>
          Si vous acceptez, tous les messages et toutes les conversations
          relatives à ce salon seront également supprimés.
        </Text>
      </View>

      <View style={chatScreensStyles.modalbuttonContainer}>
        <BtForm
          action={handleDeleteRoom}
          text={"Supprimer le salon"}
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

export default ModalDelete;
