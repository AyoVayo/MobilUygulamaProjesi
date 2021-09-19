import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";

import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background1.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/deal_2.png")} />
        <Text style={styles.tagline}>Second Chance</Text>
      </View>

      <View style={styles.buttons}>
        <AppButton
          title="Login"
          style={styles.button}
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="Register"
          color="secondary"
          style={styles.button}
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    // backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    marginTop: 10,
    //width: 180,
  },
  logoContainer: {
    width: "100%",
    position: "absolute",
    top: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttons: {
    padding: 20,
    width: "100%",
    //flexDirection: "row",
    //justifyContent: "space-around",
    bottom: 80,
  },
  tagline: {
    fontSize: 35,
    fontFamily: "monospace",
    fontWeight: "700",
    paddingVertical: 20,
    color: colors.primary,
  },
});

export default WelcomeScreen;
