import * as React from "react";
import { View, Text } from "react-native";

export default function UserDetailsScreen({
  url,
  userToken,
  userId,
  usersInfos,
  setUserInfos,
}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screen User detail </Text>
    </View>
  );
}
