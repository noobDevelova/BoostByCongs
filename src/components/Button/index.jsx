import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import fonts from "../../utilities/fonts";

const LinearBtn = ({ onPress, title, isLoading }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default LinearBtn;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#378FFF",
    paddingVertical: 16,
    borderRadius: 8,
  },

  btnText: {
    color: "#fff",
    fontFamily: fonts.fontFamily.bold,
    fontSize: fonts.size.font14,
    textAlign: "center",
  },
});
