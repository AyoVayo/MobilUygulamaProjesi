import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "../Screens/WelcomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import AuthNavigator from "./AuthNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Welcome" component={AuthNavigator} />
    <Drawer.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen name="Register" component={RegisterScreen} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
