import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Pour l'upload d'image
import * as ImagePicker from "expo-image-picker";

export default function UploadImage({ picture, setPicture, setPictureUrl }) {
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    console.log(_image.assets[0]);
    if (!_image.canceled) {
      setPicture(_image.assets[0].uri);
    }
    /*     let base64Img = `data:image/jpg;base64,${_image}`;

    //Add to cloudinary
    let apiUrl = "https://api.cloudinary.com/v1_1/lilycloud/image/upload";

    let data = {
      file: base64Img,
      upload_preset: "lilyUploadPreset",
    };
    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();
        if (data.secure_url) {
          alert("Upload successful");
          setPictureUrl(data.secure_url);
        }
      })
      .catch((err) => alert("Cannot upload")); */
  };

  // Pour demander la permission d'utiliser la media library du téléphone
  /*   const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  useEffect(() => {
    checkForCameraRollPermission();
  }, []); */

  return (
    <View style={imageUploaderStyles.container}>
      {picture && (
        <Image
          source={{ uri: picture }}
          style={imageUploaderStyles.previewImage}
        />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{picture ? "Edit" : "Upload"} Avatar</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  previewImage: {
    width: 400,
    height: 400,
    marginLeft: -100,
    marginTop: -100,
  },
});
