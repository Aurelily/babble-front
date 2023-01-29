import * as React from "react";
import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
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

//Colors:
import colors from "../assets/colors";
const { purplePrimary, grey } = colors;

//Constant pour récupérer las dimensions des devices
import Constants from "expo-constants";

//Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//UseNavigation pour pouvoir mettre des liens
import { useNavigation } from "@react-navigation/core";

//Import Expo Secure Store to stock jwt token
import * as SecureStore from "expo-secure-store";

export default function RegisterScreen({ url }) {
  const navigation = useNavigation();

  //States of input
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (firstname && lastname && email && password && confirmPassword) {
      // Si tous les champs sont remplis
      if (password === confirmPassword) {
        // si les 2 MDP sont identiques

        var userToCreate = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userToCreate),
        };
        try {
          await fetch(`${url}users/register`, requestOptions).then(
            (response) => {
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
            }
          );
        } catch (e) {
          console.log(e.message);
        }
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
          <Text style={styles.signTitle}>Sign up</Text>
        </View>
        <View style={styles.formContent}>
          <View style={styles.inputContent}>
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
            <TouchableOpacity
              style={styles.button}
              disabled={false}
              onPress={handleSubmit}
            >
              <Text style={styles.txtButton}>S'enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.txtLink}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text>Already have an account? Sign in</Text>
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

  // *---- FORM ----*

  formContent: {
    // backgroundColor: "purple",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },

  inputContent: {
    alignItems: "center",
    width: "100%",
  },

  input: {
    width: "100%",
    height: 50,
    // backgroundColor: "blue",
    borderBottomColor: purplePrimary,
    borderBottomWidth: 1,
  },

  inputArea: {
    height: 100,
    width: "100%",
    borderColor: purplePrimary,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    textAlignVertical: "top",
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
    marginVertical: 20,
  },

  txtButton: {
    color: grey,
    fontSize: 20,
    fontWeight: "bold",
  },

  msgAlert: {
    color: purplePrimary,
  },
});
