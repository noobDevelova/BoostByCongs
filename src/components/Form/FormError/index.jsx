import { StyleSheet, Text, View } from "react-native";
import { Error } from "../../../assets/icon";
import React from "react";

const FormError = ({ msg }) => {
  return (
    <View style={styles.msgWrapper}>
      <Error />
      <Text style={styles.textError}>{msg}</Text>
    </View>
  );
};

export default FormError;

const styles = StyleSheet.create({
  msgWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  textError: {
    color: "#F04438",
    flexShrink: 1,
    flexWrap: "wrap",
  },
});
