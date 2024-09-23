import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SettingsButton from "../SettingsButton";
import { Logout, Key, ListAcc, Shield } from "../../assets/icon";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../store/auth/thunks";
import { resetUserState } from "../../store/user/thunks";
import DialogBox from "../DialogBox";
import { FIREBASE_AUTH } from "../../config";

const SettingsContainer = () => {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const { userIngameAccount, userDetail } = useSelector(
    (state) => state.userData
  );

  const handleLogout = async () => {
    dispatch(signOutUser());
    dispatch(resetUserState());
  };

  const handleShow = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const ingameStatus =
    userIngameAccount?.length < 1 ? "Anda Belum Menambahkan Akun" : null;

  const phoneStatus = !userDetail?.phone_number
    ? "Anda belum memasukkan no. telp"
    : null;
  const emailStatus = !FIREBASE_AUTH.currentUser.emailVerified
    ? "Anda belum verifikasi email"
    : null;

  return (
    <View style={styles.container}>
      <SettingsButton
        Icon={Shield}
        heading="Privasi"
        subHeading="Ubah Profil Anda"
        status={emailStatus || phoneStatus}
        navigation="Privasi"
        type="linking"
      />
      <SettingsButton
        Icon={ListAcc}
        heading="Akun In-Game"
        subHeading="Kelola Akun In-Game Anda"
        status={ingameStatus}
        navigation="InGame"
        type="linking"
      />
      <SettingsButton
        Icon={Logout}
        heading="Log-Out"
        subHeading="Keluar Dari Akun Ini"
        onPress={() => handleShow()}
      />
      <DialogBox
        variant="warning"
        isVisible={showDialog}
        title="Keluar dari akun anda?"
        message="Apakah Anda yakin ingin Keluar?"
        onCancel={handleClose}
        onConfirm={handleLogout}
      />
    </View>
  );
};

export default SettingsContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 25,
    marginTop: 22,
  },
});
