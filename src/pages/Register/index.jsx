import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { WpRegister } from "../../assets/img";
import fonts from "../../utilities/fonts";
import { FormRegister, NavigateLink, RegisterLayout } from "../../components";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const Register = () => {
  return (
    <View style={styles.container}>
      <WpRegister style={styles.wp} />
      <View style={styles.innerContainer}>
        <RegisterLayout />
        <View style={styles.wrapper}>
          <NavigateLink
            title="Sudah Punya Akun?"
            linkTitle="Login"
            linkTo="Login"
          />
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  wp: {
    alignSelf: "center",
  },
  innerContainer: {
    paddingHorizontal: 18,
    marginTop: 18,
  },

  inputContainer: {
    marginTop: 18,
  },

  navigate: {
    alignSelf: "center",
  },
  btnLinkTitle: {
    color: "#082751",
    textAlign: "center",
    fontFamily: fonts.fontFamily.regular,
  },
  btnLink: {
    textAlign: "center",
    color: "#082751",
    fontFamily: fonts.fontFamily.bold,
  },
  wrapper: {
    marginTop: 12,
  },
  formWrapper: {
    marginTop: 10,
  },
});
