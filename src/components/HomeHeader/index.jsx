import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Bell, HandWave } from "../../assets/icon";
import SearchHeader from "../Header/SearchHeader";
import fonts from "../../utilities/fonts";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

const HomeHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { userDetail } = useSelector((state) => state.userData);

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.textHeaderWrapper}>
          <Text style={styles.textHeader}>Hi, {userDetail.username}</Text>
          <HandWave />
        </View>
        <View style={styles.notificationWrapper}>
          <View style={styles.notificationStatus} />
          <Bell />
        </View>
      </View>
      {userDetail?.role === "customer" && (
        <SearchHeader
          placeholder="Cari..."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight,
    gap: 10,
  },
  notificationWrapper: {
    backgroundColor: "#F8F9FD",
    padding: 8,
    borderRadius: 15,
  },

  notificationStatus: {
    width: 15,
    height: 15,
    backgroundColor: "#79EF50",
    borderRadius: 100,
    position: "absolute",
    borderWidth: 4,
    borderColor: "#fff",
    right: -2,
    top: -2,
  },

  textHeaderWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  textHeader: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.bold,
  },

  topWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
