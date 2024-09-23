import { StyleSheet, Text, View } from "react-native";
import {
  DialogBox,
  ProfileHeader,
  SettingsContainer,
} from "../../../components";
import React, { useState } from "react";
import fonts from "../../../utilities/fonts";
import { useDispatch, useSelector } from "react-redux";
import { Logout, Shield } from "../../../assets/icon";
import SettingsButton from "../../../components/SettingsButton";
import { signOutUser } from "../../../store/auth/thunks";
import { resetUserState } from "../../../store/user/thunks";

const AdminProfile = () => {
  const userDetail = useSelector((state) => state.userData.userDetail);
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();
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

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Profil</Text>
      <ProfileHeader username={userDetail.username} email={userDetail.email} />
      <View style={styles.settingContainer}>
        <SettingsButton
          Icon={Shield}
          heading="Privasi"
          subHeading="Ubah Profil Anda"
          navigation="PrivasiAdmin"
          type="linking"
        />
        <SettingsButton
          Icon={Logout}
          heading="Log-Out"
          subHeading="Keluar Dari Akun Ini"
          onPress={() => handleShow()}
        />
      </View>

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

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  screenTitle: {
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.bold,
  },
  settingContainer: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 25,
    marginTop: 22,
  },
});
