import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

// Import components
import InputText from "../components/atoms/InputText";
import InputEmail from "../components/atoms/InputEmail";
import InputPassword from "../components/atoms/InputPassword";

// Colors:
import colors from "../assets/colors";
const { purplePrimary, grey } = colors;

// Constant pour récupérer las dimensions des devices
import Constants from "expo-constants";

// Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// UseNavigation pour pouvoir mettre des liens
import { useNavigation } from "@react-navigation/core";

export default function ProfileScreen({
  deleteInStore,
  userToken,
  setUserToken,
  userId,
  url,
  userInfos,
  setUserInfos,
}) {
  const navigation = useNavigation();

  //States of input
  const [firstname, setFirstname] = useState(userInfos.firstname);
  const [lastname, setLastname] = useState(userInfos.lastname);
  const [email, setEmail] = useState(userInfos.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmitUpdate = async () => {
    if (firstname && lastname && email && password && confirmPassword) {
      // Si tous les champs sont remplis
      if (password === confirmPassword) {
        // si les 2 MDP sont identiques

        var userToUpdate = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          avatarPath:
            "https://res.cloudinary.com/lilycloud/image/upload/v1675756437/babble/users/avatar-default_tpd0vq.jpg",
        };
        const requestOptions = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken,
          },
          body: JSON.stringify(userToUpdate),
        };
        await fetch(`${url}users/update/profil`, requestOptions)
          .then((response) => {
            console.log(response);
            response.json().then((data) => {
              if (data.status == 200) {
                console.log(data.status);
                setAlert("Update OK");
                /* navigation.navigate("Login"); */
              }
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        // si les 2 MDP ne sont pas identiques
        setAlert("MDP doivent être identiques");
      }
    } else {
      // Si tous les champs ne sont pas remplis
      setAlert("Remplir tous les champs");
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
          <Text style={styles.signTitle}>Profil </Text>
          <Text style={styles.subTitle}>
            Ici vous pouvez modifier les informations de votre profil..
          </Text>
          <Text style={styles.subTitle}>
            Vous pouvez également créer un avatar.
          </Text>
        </View>
        <View style={styles.formContent}>
          <Image
            source={require("../assets/img/avatar-default.jpg")}
            style={styles.avatar}
          />
          <InputText
            placeholder="Prénom"
            value={firstname}
            setValue={setFirstname}
          />
          <InputText
            placeholder="Nom"
            value={lastname}
            setValue={setLastname}
          />
          <InputEmail placeholder="email" value={email} setValue={setEmail} />
          <InputPassword placeholder="Mot de passe" setValue={setPassword} />
          <InputPassword
            placeholder="Confirmez votre mot de passe"
            setValue={setConfirmPassword}
          />
        </View>
        <View style={styles.buttonsContent}>
          <Text style={styles.msgAlert}>{alert}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSubmitUpdate}>
            <Text>Mettre à jour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              deleteInStore("jwtToken");
              setUserToken(null);
            }}
          >
            <Text>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    alignItems: "center",
  },

  // *---- LOGO ZONE ----*
  logoZone: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
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

  subTitle: {
    fontSize: 12,
    color: grey,
  },

  // *---- FORM ----*
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 999,
  },

  formContent: {
    // backgroundColor: "purple",
    width: "80%",
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputContent: {
    alignItems: "center",
    width: "100%",
  },

  input: {
    width: "100%",
    height: 50,
    borderBottomColor: purplePrimary,
    borderBottomWidth: 1,
  },

  buttonsContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  button: {
    borderColor: purplePrimary,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 200,
    marginVertical: 30,
  },

  txtButton: {
    color: grey,
    fontSize: 20,
    fontWeight: "bold",
  },

  msgAlert: {
    color: purplePrimary,
  },

  txtLink: {
    justifyContent: "center",
    alignItems: "center",
  },
});
