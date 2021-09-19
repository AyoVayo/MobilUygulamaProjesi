import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import * as firebase from "firebase";

import { loggingOut } from "../api/firebaseMethod";
import AuthContext from "../auth/context";
import AppIcon from "../components/AppIcon";

import { ListItem, ListItemSeperator } from "../components/lists";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  //const idTokenResult = authStorage.getToken();
  //console.log(idTokenResult.token);
  //const jwtuser = jwtDecode(idTokenResult.token);
  //console.log(jwtuser);
  //const currentUserUID = user.user_id;
  const { user, logOut } = useAuth();
  let currentUserUID = firebase.auth().currentUser.uid;
  const [name, setName] = useState("");
  //console.log(user.sub);

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setName(dataObj.userName);
      }
    }
    getUserInfo();
  });

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={name}
          subTitle={user.email}
          image={require("../assets/cat.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <AppIcon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
              showChevrons={true}
            />
          )}
        />
      </View>
      <ListItem
        title={"Log Out"}
        IconComponent={<AppIcon name="logout" backgroundColor="#ffe66d" />}
        showChevrons={true}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
