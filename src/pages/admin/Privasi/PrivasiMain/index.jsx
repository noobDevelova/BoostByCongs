import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PageHeader } from "../../../../components";
import SettingsButton from "../../../../components/SettingsButton";
import { Key, Mail, Phone } from "../../../../assets/icon";

const PrivasiAdmin = () => {
  return (
    <View style={styles.container}>
      <PageHeader page="Profil" subPage="Privasi" />
      <View style={styles.linkContainer}>
        <SettingsButton
          Icon={Mail}
          heading="Email"
          subHeading="Ubah Email Anda"
          navigation="EmailAdminSettings"
          type="linking"
        />
        {/* <SettingsButton
          Icon={Key}
          heading="Password"
          subHeading="Ubah Password Anda"
          navigation="PasswordSettings"
          type="linking"
        /> */}
        <SettingsButton
          Icon={Phone}
          heading="Nomor Telepon"
          subHeading="Ubah Nomor Telepon Anda"
          navigation="PhoneNumberSetting"
          type="linking"
        />
      </View>
    </View>
  );
};

export default PrivasiAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F9F9F9",
  },
  linkContainer: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 25,
    marginTop: 22,
  },
});
