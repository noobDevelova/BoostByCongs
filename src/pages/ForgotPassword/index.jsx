import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { WpRegister } from "../../assets/img";
import { ForgotPasswordLayout } from "../../components";

const ForgotPassword = ({ route }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 50}
      style={styles.container}
    >
      <WpRegister style={styles.wp} />
      <View style={styles.innerContainer}>
        <ForgotPasswordLayout />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  innerContainer: {
    paddingHorizontal: 18,
    marginTop: 18,
  },
});
