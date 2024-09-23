import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../../utilities/fonts";

const ProductBadge = ({ type }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textBadge}>
        {type === "unit" ? "Per Bintang" : "Paket"}
      </Text>
    </View>
  );
};

export default ProductBadge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FF",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  textBadge: {
    color: "#1A94FF",
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.semiBold,
  },
});
