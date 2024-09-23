import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { ProfileDefault } from "../../assets/img";
import { Edit } from "../../assets/icon";
import fonts from "../../utilities/fonts";

const ProfileHeader = ({ username, email }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <ProfileDefault />
          <Image
            style={styles.imageProfile}
            source={require("../../assets/img/user_img_default.png")}
          />
        </View>
        <View style={styles.identityWrapper}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#378FFF",
    borderRadius: 5,
    marginTop: 16,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  username: {
    color: "#fff",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.bold,
  },
  email: {
    color: "#D7D7D7",
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
  },
  imageContainer: {
    position: "relative",
    marginRight: 11,
  },
  imageProfile: {
    borderRadius: 50,
    position: "absolute",
    top: 2,
    left: 2,
  },
});
