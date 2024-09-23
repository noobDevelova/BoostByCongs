import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
} from "react-native";
import { Wp } from "../../assets/img";
import fonts from "../../utilities/fonts";
import { FormLogin, NavigateLink } from "../../components";
import { StatusBar } from "expo-status-bar";
import matrics from "../../utilities/screenDimensions";

const Login = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 50}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Wp style={styles.wp} />
      <View style={styles.innerWrapper}>
        <Text style={styles.title}>Masuk</Text>
        <Text style={styles.subTitle}>Masuk Akun dan Mulai Petualanganmu</Text>
        <FormLogin />
      </View>
      <View style={styles.wrapper}>
        <NavigateLink
          title="Belum Punya Akun?"
          linkTitle="Daftar"
          linkTo="Register"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  wp: {
    alignSelf: "center",
  },
  innerWrapper: {
    marginTop: 15,
    paddingHorizontal: 18,
  },
  title: {
    color: "#101828",
    fontSize: fonts.size.font24,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 32,
    marginBottom: 6,
  },
  subTitle: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,

    color: "#667085",
  },

  wrapper: {
    marginTop: 20,
  },
});
