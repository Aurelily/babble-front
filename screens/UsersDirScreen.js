import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

// Import colors ans style
import { chatScreensStyles } from "../styles/chatScreensStyles";
import { genStyles } from "../styles/genStyles";

// Import components
import UserComponent from "../components/molecules/UserComponent";
import { usersScreenStyle } from "../styles/usersScreenStyle";

export default function UsersDirScreen({
  url,
  userToken,
  setUserToken,
  userId,
  usersInfos,
  setUserInfos,
  deleteInStore,
}) {
  const [usersList, setUsersList] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  async function fetchUsers() {
    try {
      await fetch(`${url}users`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          if (data.status == 200) {
            setUsersList(data.data);
            setUsersLoading(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return usersLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading users list...</Text>
    </View>
  ) : (
    <SafeAreaView style={usersScreenStyle.container}>
      <ImageBackground
        source={require("../assets/img/fond-bulles-orange3.png")}
        style={usersScreenStyle.bgImage}
      >
        <View style={usersScreenStyle.topZone}>
          <View
            style={[usersScreenStyle.btDecoPos, usersScreenStyle.btLabelZone]}
          ></View>
          <Image
            source={require("../assets/img/couple-orange.png")}
            style={usersScreenStyle.coupleOrange}
          />
        </View>

        <View style={usersScreenStyle.userslistContainer}>
          {usersList.length > 0 ? (
            <FlatList
              data={usersList}
              renderItem={({ item }) => (
                <UserComponent
                  item={item}
                  url={url}
                  userToken={userToken}
                  userId={userId}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled={true}
              scrollEnabled={true}
              style={usersScreenStyle.flatlistContainer}
            />
          ) : (
            <View
              style={[
                usersScreenStyle.flatListEmptyContainer,
                genStyles.genCenter,
              ]}
            >
              <Text
                style={[genStyles.titleClearText, genStyles.textAlignCenter]}
              >
                Il n'y a aucun babbler inscrits!
              </Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
