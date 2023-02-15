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

export default function ProfileScreen({ deleteInStore, setUserToken }) {
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
          <InputText
            placeholder="Prénom"
            /* value={firstname}
            setValue={setFirstname} */
          />
          <InputText
            placeholder="Nom"
            /*   value={lastname}
            setValue={setLastname} */
          />
          <InputEmail
            placeholder="email" /* value={email} setValue={setEmail} */
          />
          <InputPassword
            placeholder="Mot de passe" /* setValue={setPassword} */
          />
          <InputPassword
            placeholder="Confirmez votre mot de passe"
            /* setValue={setConfirmPassword} */
          />
        </View>
        <View style={styles.buttonsContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              deleteInStore("jwtToken");
              setUserToken(null);
            }}
          >
            <Text>Disconnect</Text>
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
