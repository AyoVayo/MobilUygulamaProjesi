import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as firebase from "firebase";
import "firebase/firestore";

import Screen from "../components/Screen";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import AuthContext from "../auth/context";
import { registeration } from "../api/firebaseMethod";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function RegisterScreen(props) {
  const authContext = useContext(AuthContext);
  const handleSubmit = async ({ email, password, name }) => {
    //registeration(email, password, name);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    authContext.setUser(currentUser);

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      userName: name,
    });
  };
  /* handleSubmit = ({ email, password, userName }) => {
    firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(user.uid).set({
      email: user.email,
      userName: userName,
    });
  }; */

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
          flex={1}
        />
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
        <SubmitButton title="Register" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
