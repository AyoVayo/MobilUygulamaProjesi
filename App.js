import React, { useState } from "react";
import * as firebase from "firebase";
import AppLoading from "expo-app-loading";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { Button, View } from "react-native";
import navigationTheme from "./app/navigation/navigationTheme";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import apiKeys from "./app/config/keys";
import authStorage from "./app/auth/authStorage";
import DrawerNavigator from "./app/navigation/DrawerNavigator";

export default function App() {
  //const [isReady, setIsReady] = useState(false);
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  const [user, setUser] = useState();

  /* const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    ); */

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <DrawerNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
