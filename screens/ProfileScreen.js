import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Switch,
  ImageBackground,
} from "react-native";

// Import components
import InputText from "../components/atoms/InputText";
import InputEmail from "../components/atoms/InputEmail";
import InputPassword from "../components/atoms/InputPassword";
import BtForm from "../components/atoms/BtForm";

// Colors:
import colors from "../assets/colors";
import { genStyles } from "../styles/genStyles";
import { registerScreenStyle } from "../styles/registerScreenStyles";
import { profilScreenStyle } from "../styles/profilScreenStyle";

// Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ProfileScreen({
  deleteInStore,
  userToken,
  setUserToken,
  userId,
  url,
  userInfos,
}) {
  // Pour le switch RGPD
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
        if (isEnabled) {
          var userToUpdate = {
            _id: userId,
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
              /* console.log(response); */
              response.json().then((data) => {
                if (data.status == 200) {
                  /*  console.log(data.status); */
                  setAlert("Update OK");
                  deleteInStore("jwtToken");
                  setUserToken(null);
                }
                if (data.status == 409) {
                  /*  console.log(data.status); */
                  setAlert("cet email possède déjà un compte");
                }
              });
            })
            .catch((e) => {
              console.log(e);
            });
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
          source={require("../assets/img/fond-bulles-violet3.png")}
          style={registerScreenStyle.bgImage}
        >
          <View style={profilScreenStyle.avatarZone}>
            <View
              style={[
                profilScreenStyle.btDecoPos,
                profilScreenStyle.btLabelZone,
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  deleteInStore("jwtToken");
                  setUserToken(null);
                }}
                style={genStyles.genCenter}
              >
                <Image
                  source={require("../assets/img/bt-deco.png")}
                  style={profilScreenStyle.btOrange}
                />
                <Text style={[genStyles.basicClearText, genStyles.boldText]}>
                  Déconnexion
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                profilScreenStyle.btEditPos,
                profilScreenStyle.btLabelZone,
              ]}
            >
              <TouchableOpacity
                style={profilScreenStyle.btEditPos}
                onPress={() => {
                  console.log("Modal avatar");
                }}
              >
                <Image
                  source={require("../assets/img/bt-editer.png")}
                  style={profilScreenStyle.btOrange}
                />
                <Text style={[genStyles.basicClearText, genStyles.boldText]}>
                  Avatar
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/img/avatar-defaut.png")}
              style={profilScreenStyle.avatar}
            />
            <Text
              style={[
                genStyles.basicClearText,
                genStyles.textAlignCenter,
                genStyles.textContainerWidth,
                genStyles.boldText,
              ]}
            >
              Ici vous pouvez modifier les informations de votre profil, ainsi
              que votre avatar.
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
                action={handleSubmitUpdate}
                text={"Mettre à jour mes infos"}
                colorStart={colors.purplePrimary}
                colorEnd={colors.purpleSecondary}
              />
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
              découler.
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
