import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ListBox = ({ children }) => {
  return <View style={styles.listBox}>{children}</View>;
};

export default ListBox;

const styles = StyleSheet.create({
  listBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
});
