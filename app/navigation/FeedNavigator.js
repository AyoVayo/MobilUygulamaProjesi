import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListingDetailsScreen from "../Screens/ListingDetailsScreen";
import ListingsScreen from "../Screens/ListingsScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Listings"
      component={ListingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetailsScreen}
      options={{
        headerTitle: "",
      }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
