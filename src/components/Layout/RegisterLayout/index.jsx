import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import fonts from "../../../utilities/fonts";
import FormEmail from "../../Form/FormEmail";
import FormRegister from "../../Form/FormRegister";

const RegisterLayout = () => {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daftar Akun</Text>
        <Text style={styles.subTitle}>Buat Akun dan Mulai Petualanganmu</Text>
      </View>

      {!status && (
        <View style={styles.layoutWrapper}>
          <FormEmail
            setAction={setStatus}
            setEmail={setEmail}
            checking={true}
          />
        </View>
      )}

      {status && email !== "" && (
        <View style={styles.layoutWrapper}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 50}
            // contentContainerStyle={{ flex: 1 }}
          >
            <FormRegister email={email} />
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};

export default RegisterLayout;

const styles = StyleSheet.create({
  header: {
    gap: 6,
  },
  title: {
    fontSize: fonts.size.font24,
    fontFamily: fonts.fontFamily.bold,
    color: "#101828",
    lineHeight: 32,
  },
  subTitle: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
  },

  layoutWrapper: {
    marginTop: 15,
  },
});
