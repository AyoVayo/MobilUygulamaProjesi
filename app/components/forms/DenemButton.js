import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../AppButton";

function DenemButton({ title, ...otherProps }) {
  return <AppButton title={title} {...otherProps} />;
}

const styles = StyleSheet.create({
  container: {},
});

export default DenemButton;
