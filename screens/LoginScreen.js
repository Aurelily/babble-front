import React from "react";
import { useState } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";

// Import components
import InputEmail from "../components/atoms/InputEmail";
import InputPassword from "../components/atoms/InputPassword";
import BtForm from "../components/atoms/BtForm";

//Colors and styles:
import colors from "../assets/colors";
const { purplePrimary, grey } = colors;
import { genStyles } from "../styles/genStyles";
import { loginScreenStyle } from "../styles/loginScreenStyles";

//Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//UseNavigation pour pouvoir mettre des liens
import { useNavigation } from "@react-navigation/core";

export default function LoginScreen({
  keyTokenStore,
  setUserToken,
  setUserId,
  url,
  saveToStore,
}) {
  const navigation = useNavigation();

  //States of input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
              if (data.data.token) {
                const token = data.data.token;
                setUserToken(token);
                setUserId(data.data._id);
                saveToStore(keyTokenStore, token);
              }
            }
            if (data.status == 500) {
              setAlert(data.message);
            }
            if (data.status == 400) {
              setAlert("Login or password incorrect !");
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
      <SafeAreaView style={loginScreenStyle.container}>
        <ImageBackground
          source={require("../assets/img/fond-bulles-orange2.png")}
          style={loginScreenStyle.bgImage}
        >
          <View style={loginScreenStyle.logoZone}>
            <Image
              source={require("../assets/img/logo-orange.png")}
              style={loginScreenStyle.logoSign}
            />
            <Text style={[genStyles.basicClearText, genStyles.textAlignCenter]}>
              Veuillez vous connecter pour accéder aux salons de discussion, à
              vos favoris et à la liste des Babblers !.
            </Text>
          </View>
          <View style={genStyles.formContent}>
            <View style={genStyles.inputContent}>
              <InputEmail
                placeholder="email"
                value={email}
                setValue={setEmail}
              />

              <InputPassword placeholder="password" setValue={setPassword} />
            </View>
            <View style={genStyles.buttonsContent}>
              <Text style={genStyles.msgAlert}>{alert}</Text>

              <BtForm
                action={handleSubmit}
                text={"Se connecter"}
                colorStart={colors.purplePrimary}
                colorEnd={colors.purpleSecondary}
              />
            </View>
          </View>
          <Image
            source={require("../assets/img/emo-violet-01.png")}
            style={loginScreenStyle.emoRegister}
          />
          <TouchableOpacity
            style={genStyles.genCenter}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={genStyles.titlePurpleText}>Pas encore inscrit ?</Text>
            <Text
              style={[
                genStyles.basicPurpleText,
                genStyles.textContainerWidth,
                genStyles.textAlignCenter,
              ]}
            >
              Créez votre compte Babble pour chatter avec d'autres babblers.
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
