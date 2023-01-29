import React from "react";
import { useState } from "react";
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

//UseNavigation pour pouvoir mettre des liens
import { useNavigation } from "@react-navigation/core";

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
      var userToLogin = {
        email: email,
        password: password,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToLogin),
      };

      try {
        await fetch(`${url}users/login`, requestOptions).then((response) => {
          response.json().then((data) => {
            if (data.status == 200) {
              setAlert(data.message);
            }
            if (data.status == 500) {
              setAlert(data.message);
            }
            if (data.status == 400) {
              setAlert("Login or password incorrect !");
            }
            if (data.data.token) {
              const token = data.data.token;
              setToken(token);
            }
          });
        });
      } catch (error) {
        console.log(error.message);
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
