import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { genStyles } from "../../styles/genStyles";
import { LinearGradient } from "expo-linear-gradient";

const BtForm = ({ colorStart, colorEnd, action, text }) => {
  return (
    <TouchableOpacity onPress={action}>
      <LinearGradient
        // Button Linear Gradient
        colors={[colorStart, colorEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={genStyles.buttonForm}
      >
        <Image
          source={require("../../assets/img/shiny.png")}
          style={genStyles.shiny}
        />
        <Text style={[genStyles.buttonsClearText, genStyles.textAlignCenter]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BtForm;
