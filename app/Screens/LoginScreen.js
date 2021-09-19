import React, { useState, useContext } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import * as firebase from "firebase";
import jwtDecode from "jwt-decode";

import Screen from "../components/Screen";

import {
  ErrorMessage,
  AppFormField,
  AppForm,
  SubmitButton,
} from "../components/forms";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import authStorage from "../auth/authStorage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  //const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = async ({ email, password }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    authContext.setUser(currentUser);
    const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
    authStorage.storeToken(idTokenResult.token);
    //authStorage.getToken(authToken);
    const user = jwtDecode(idTokenResult.token);
    console.log(user.user_id);
    //console.log(deneme);
    //authStorage.storeToken(() => currentUser.getIdToken());
    //console.log(token);
    //authStorage.storeToken(currentUser.uid);
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-deal.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <ErrorMessage error={this.state.errorMessage} visible={loginFailed} /> */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          flex={1}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          flex={1}
        />
        {/* <AppButton title="Login" onPress={handleSubmit} /> */}
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
