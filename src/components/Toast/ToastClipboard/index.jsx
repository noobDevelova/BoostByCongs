import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../../utilities/fonts";

const ToastClipboard = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.toastText}>{title} telah disalin ke clipboard.</Text>
    </View>
  );
};

export default ToastClipboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222222",
    padding: 8,
    borderRadius: 3,
    alignItems: "center",
  },

  toastText: {
    color: "#fff",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
  },
});
