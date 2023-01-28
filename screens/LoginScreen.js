import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

// Import components
import InputEmail from "../components/atoms/InputEmail";
import InputPassword from "../components/atoms/InputPassword";

//Colors:
import colors from "../assets/colors";
const { purplePrimary, grey } = colors;

//Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Axios pour envoyer des requetes
const axios = require("axios");

//Import Expo Secure Store to stock jwt token
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ setToken, getUserId, url }) {
  const navigation = useNavigation();

  //States of input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState("");

  //handleSubmit function for sign in button
  const handleSubmit = async () => {
    if (email && password) {
      if (alert !== null) {
        setAlert(null);
      }

      try {
        const response = await axios.post(`${url}users/login`, {
          email,
          password,
        });

        if (response.data.token) {
          const token = response.data.token;
          setToken(token);
        } else {
          setAlert(error.response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
        if (error.response.status === 401) {
          setAlert(error.response.data.message);
        } else {
          setAlert(error.response.data.message);
        }
      }
    } else {
      setAlert("Please fill all fields");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoZone}>
          {/*     <Image
            source={require("../assets/img/logo.png")}
            style={styles.logoSign}
          /> */}
          <Text style={styles.signTitle}>Bienvenue sur BABBLE !</Text>
          <Text style={styles.subTitle}>
            Veuillez vous connecter pour accéder aux discussion.
          </Text>
        </View>
        <View style={styles.formContent}>
          <View style={styles.inputContent}>
            <InputEmail placeholder="email" value={email} setValue={setEmail} />

            <InputPassword placeholder="password" setValue={setPassword} />
          </View>
          <View style={styles.buttonsContent}>
            <Text style={styles.msgAlert}>{alert}</Text>
            <TouchableOpacity
              style={styles.button}
              /* disabled={isLoading ? true : false} */
              onPress={handleSubmit}
            >
              <Text style={styles.txtButton}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.txtLink}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.signTitle}>Pas encore inscrit ?</Text>
              <Text style={styles.subTitle}>
                Cliquez ici pour créer votre compte.
              </Text>
            </TouchableOpacity>
          </View>
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
