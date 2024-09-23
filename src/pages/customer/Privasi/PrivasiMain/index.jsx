import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PageHeader } from "../../../../components";
import SettingsButton from "../../../../components/SettingsButton";
import { Key, Mail, Phone } from "../../../../assets/icon";
import { FIREBASE_AUTH } from "../../../../config";
import { useSelector } from "react-redux";

const Privasi = () => {
  const { userDetail } = useSelector((state) => state.userData);

  const phoneStatus = !userDetail?.phone_number
    ? "Anda belum memasukkan no. telp"
    : null;
  const emailStatus = !FIREBASE_AUTH.currentUser.emailVerified
    ? "Anda belum verifikasi email"
    : null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader page="Profil" subPage="Privasi" />
      </View>
      <View style={styles.body}>
        <View style={styles.linkContainer}>
          <SettingsButton
            Icon={Mail}
            heading="Email"
            subHeading="Ubah Email Anda"
            navigation="EmailSetting"
            status={emailStatus}
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
            status={phoneStatus}
            type="linking"
          />
        </View>
      </View>
    </View>
  );
};

export default Privasi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linkContainer: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 25,
    marginTop: 22,
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    paddingBottom: 10,
  },

  body: {
    marginHorizontal: 16,
  },
});
