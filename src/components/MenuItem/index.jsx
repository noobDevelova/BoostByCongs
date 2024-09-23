import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MenuItem = ({ title, Icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon />
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
