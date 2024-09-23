import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../../utilities/fonts";

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          text: "Pending",
          message: "Menunggu Konfirmasi",
          backgroundColor: "#FFF5EB",
          color: "#FC820A",
        };
      case "On Process":
        return {
          text: "On Process",
          message: "Sedang Diboosting",
          backgroundColor: "#F0F8FF",
          color: "#1A94FF",
        };
      case "Done":
        return {
          text: "Done",
          message: "Boosting Selesai",
          backgroundColor: "#EFFFF4",
          color: "#00AB56",
        };
      default:
        return { text: "Unknown", backgroundColor: "#D3D3D3" };
    }
  };

  const badgeStyle = getBadgeStyle(status);

  return (
    <View
      style={[
        styles.statusWrapper,
        { backgroundColor: badgeStyle.backgroundColor },
      ]}
    >
      <Text style={[styles.statusText, { color: badgeStyle.color }]}>
        {badgeStyle.text}
      </Text>
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  statusWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontWeight: "bold",
    fontFamily: fonts.fontFamily.medium,
    fontSize: fonts.size.font14,
  },
});
