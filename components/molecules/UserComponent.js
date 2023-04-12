import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

//import styles

import { usersScreenStyle } from "../../styles/usersScreenStyle";

const UserComponent = ({
  item,
  url,
  rootPath,
  userToken,
  userId,
  setUsersConnectedList,
  usersConnectedList,
  usersList,
  setUsersList,
}) => {
  const navigation = useNavigation();

  //Navigates to the User detail screen
  const handleNavigation = () => {
    navigation.navigate("userDetail", {
      id: item._id,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      avatarPath: item.avatarPath,
    });
  };

  return (
    <>
      <Pressable style={usersScreenStyle.component} onPress={handleNavigation}>
        <Image
          source={{ uri: rootPath + item.avatarPath }}
          style={usersScreenStyle.avatar}
        />

        <View style={usersScreenStyle.cContainer}>
          <View>
            <Text style={usersScreenStyle.cUserName}>
              {item.firstname} {item.lastname}
            </Text>
          </View>
        </View>
        <View style={usersScreenStyle.bgOpacity}></View>
      </Pressable>
    </>
  );
};

export default UserComponent;
