import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";
import * as Notifications from "expo-notifications";
import * as firebase from "firebase";

import ListItem from "../components/lists/ListItem";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

function ListingDetailsScreen({ route }) {
  const showNotification = () => {
    Notifications.presentNotificationAsync({
      title: "Congratulations",
      body: "Your order successfully placed!",
      data: {
        _displayInForeground: true,
      },
    });
  };
  const listing = route.params;
  return (
    <View>
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}> {listing.title} </AppText>
        <AppText style={styles.price}>$ {listing.price} </AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/cat.jpg")}
            title="Bilge"
            subTitle="5 Listings"
            showChevrons={true}
          />
          <AppButton title="Order" onPress={showNotification} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
