import { StyleSheet, Text, View } from "react-native";
import React from "react";

import fonts from "../../../utilities/fonts";

const FeaturedCard = ({ Icon, title, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Icon width={20} />
      </View>
    </View>
  );
};

export default FeaturedCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  iconWrapper: {
    backgroundColor: "#B8D7FF",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#202224",
    marginBottom: 16,
  },
  value: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.bold,
    color: "#202224",
  },
});
