import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";

// Import components
import InputText from "../components/atoms/InputText";
import InputEmail from "../components/atoms/InputEmail";
import InputPassword from "../components/atoms/InputPassword";
import BtForm from "../components/atoms/BtForm";

// Colors and styles:
import colors from "../assets/colors";
const { purplePrimary, purpleSecondary, grey } = colors;
import { genStyles } from "../styles/genStyles";
import { registerScreenStyle } from "../styles/registerScreenStyles";

// Constant pour récupérer las dimensions des devices
import Constants from "expo-constants";

// Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// UseNavigation pour pouvoir mettre des liens
import { useNavigation } from "@react-navigation/core";

export default function RegisterScreen({ url, setUserDatas }) {
  const navigation = useNavigation();

  // Pour le switch RGPD
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //States of input
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async () => {
    if (firstname && lastname && email && password && confirmPassword) {
      // Si tous les champs sont remplis
      if (password === confirmPassword) {
        // si les 2 MDP sont identiques
        if (isEnabled) {
          var userToCreate = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            avatarPath:
              "https://res.cloudinary.com/lilycloud/image/upload/v1675756437/babble/users/avatar-default_tpd0vq.jpg",
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
                    console.log(data.status);
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
          setAlert("Veuillez accepter les conditions");
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
      <SafeAreaView style={registerScreenStyle.container}>
        <ImageBackground
          source={require("../assets/img/fond-bulles-violet.png")}
          style={registerScreenStyle.bgImage}
        >
          <View style={registerScreenStyle.avatarZone}>
            <Image
              source={require("../assets/img/avatar-defaut.png")}
              style={registerScreenStyle.avatar}
            />
            <Text
              style={[
                genStyles.basicClearText,
                genStyles.textAlignCenter,
                genStyles.textContainerWidth,
              ]}
            >
              Créez votre compte pour pouvoir chatter avec les “babblers”. Vous
              pourrez modifier votre avatar plus tard.
            </Text>
          </View>
          <View style={genStyles.formContent}>
            <View style={genStyles.inputContent}>
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
              <InputEmail
                placeholder="email"
                value={email}
                setValue={setEmail}
              />
              <InputPassword
                placeholder="Mot de passe"
                setValue={setPassword}
              />
              <InputPassword
                placeholder="Confirmez votre mot de passe"
                setValue={setConfirmPassword}
              />
            </View>
            <View style={genStyles.buttonsContent}>
              <Text style={genStyles.msgAlert}>{alert}</Text>
              <BtForm
                action={handleSubmit}
                text={"Créer mon compte"}
                colorStart={colors.purplePrimary}
                colorEnd={colors.purpleSecondary}
              />
              <TouchableOpacity
                style={genStyles.genCenter}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={genStyles.titlePurpleText}>
                  J'ai déjà un compte !
                </Text>
                <Text style={genStyles.basicPurpleText}>
                  Je me connecte ici.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={registerScreenStyle.rgpdZone}>
            <Switch
              trackColor={{ false: "#767577", true: "#FE9920" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text
              style={[genStyles.miniPurpleText, registerScreenStyle.rgpdText]}
            >
              En soumettant ce formulaire, j'accepte que les informations
              saisies soient exploitées dans le cadre de la demande d'accès à
              l'application BABBLE et de la relation commerciale qui peut en
              découler (Envoi de newsletter de la part de BABBLE).
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
