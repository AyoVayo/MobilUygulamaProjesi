import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import AuthContext from "../auth/context";

export async function registeration(email, password, userName) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      userName: userName,
      notificationToken: "",
    });
  } catch (error) {
    Alert.alert("There is something wrong!", error.message);
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    Alert.alert("There is something wrong!", error.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    Alert.alert("There is something wrong", error.message);
  }
}
