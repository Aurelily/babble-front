import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

// Import components
import UploadImage from "../components/molecules/UploadImages";

const FormData = require("form-data");

// Colors:
import colors from "../assets/colors";
const { purplePrimary, grey } = colors;

// Constant pour récupérer las dimensions des devices
import Constants from "expo-constants";

// Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// UseNavigation pour pouvoir mettre des liens
import { useNavigation } from "@react-navigation/core";

export default function RegisterScreenStep2({ url, userDatas }) {
  const navigation = useNavigation();

  //Image Picker picture URI
  const [picture, setPicture] = useState(
    "https://res.cloudinary.com/lilycloud/image/upload/v1675756437/babble/users/avatar-default_tpd0vq.jpg"
  );
  //Cloudinary secure_url
  const [pictureUrl, setPictureUrl] = useState("");

  const [alert, setAlert] = useState("");

  const handleSubmit = async () => {
    // Upload Image on cloudinary
    console.log(picture);

    fetch(`${url}users/upload`, {
      body: { avatarPath: picture },
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();
        if (data.secure_url) {
          console.log("Upload OK");
          setPictureUrl(data.secure_url);
          userDatas.avatarPath = pictureUrl;
        }
      })
      .catch((err) => console.log("Cannot upload"));

    // Create User

    var userToCreate = userDatas;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userToCreate),
    };

    try {
      await fetch(`${url}users/register`, requestOptions).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setAlert(data.message);
            navigation.navigate("Login");
          }
          if (data.status == 409) {
            setAlert(data.message);
          }
          if (data.status == 500) {
            setAlert(data.message);
          }
        });
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoZone}>
          {/*           <Image
            source={require("../assets/img/logo.png")}
            style={styles.logoSign}
          /> */}
          <Text style={styles.signTitle}>Inscription : Etape 2</Text>
        </View>
        <View style={styles.container}>
          <UploadImage
            picture={picture}
            setPicture={setPicture}
            setPictureUrl={setPictureUrl}
          />
        </View>
        <View style={styles.buttonsContent}>
          <Text style={styles.msgAlert}>{alert}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={false}
          onPress={handleSubmit}
        >
          <Text style={styles.txtButton}>Créer son compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.txtLink}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  // *---- LOGO ZONE ----*
  logoZone: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },

  logoSign: {
    height: 100,
    width: 100,
  },

  signTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: grey,
  },

  // *---- CONTAINER ----*

  container: {
    padding: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    borderColor: purplePrimary,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 200,
    marginVertical: 20,
  },

  txtButton: {
    color: grey,
    fontSize: 20,
    fontWeight: "bold",
  },
});
