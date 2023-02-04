import * as React from "react";
import { View, Text } from "react-native";

export default function HomeScreen({ userId }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screen Home : connexion confirmée pour le user : {userId} </Text>
    </View>
  );
}
