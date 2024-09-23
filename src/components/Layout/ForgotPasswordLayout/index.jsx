import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormEmail from "../../Form/FormEmail";
import fonts from "../../../utilities/fonts";
import ButtonIcon from "../../ButtonIcon";
import { ArrowBack } from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordLayout = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <ButtonIcon Icon={ArrowBack} onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Reset Password</Text>
        </View>
        <Text style={styles.subTitle}>
          Kami akan mengirim link email untuk reset password
        </Text>
      </View>
      <View style={styles.layoutWrapper}>
        <FormEmail checking={false} />
      </View>
    </View>
  );
};

export default ForgotPasswordLayout;

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
