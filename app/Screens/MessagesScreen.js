import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeperator,
} from "../components/lists";
import Screen from "../components/Screen";

const initalMessages = [
  {
    id: 1,
    title: "Ali Kerem",
    description: "Still available?",
    image: require("../assets/cat.jpg"),
  },
  {
    id: 2,
    title: "Bilge",
    description: "Still available?",
    image: require("../assets/cat.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initalMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            showChevrons
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() =>
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/cat.jpg"),
            },
          ])
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
