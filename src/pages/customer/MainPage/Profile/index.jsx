import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../../../utilities/fonts";
import { ProfileHeader, SettingsContainer } from "../../../../components";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

const CustomerProfile = () => {
  const { userLoading, userDetail, userError } = useSelector(
    (state) => state.userData
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Profil</Text>
      </View>
      <View style={styles.body}>
        <ProfileHeader
          username={userDetail.username}
          email={userDetail.email}
        />
        <SettingsContainer />
      </View>
    </View>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  body: {
    paddingHorizontal: 16,
  },
  screenTitle: {
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.bold,
  },
});
