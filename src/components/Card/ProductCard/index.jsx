import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import fonts from "../../../utilities/fonts";
import { LinearGradient } from "expo-linear-gradient";

const ProductCard = ({ Icon, title, btnTitle, navigateTo }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#378FFF", "#082751"]}
        style={styles.background}
        start={[0, 0]}
        end={[1, 0]}
        location={[0.25, 0.9, 2]}
      />
      <View style={styles.imgWrapper}>
        <Icon />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.boostBtn} onPress={navigateTo}>
          <Text style={styles.btnText}>{btnTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    padding: 16,
    flexDirection: "column",
  },
  wrapper: {
    flexDirection: "column",
    gap: 5,
  },
  headerTitle: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#FFFFFF",
  },
  imgWrapper: {
    position: "absolute",
    right: 0,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 175,
    borderRadius: 6,
  },
  boostBtn: {
    backgroundColor: "#FCFCFD",
    paddingHorizontal: 31,
    paddingVertical: 9,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  btnText: {
    color: "#378FFF",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 18,
  },
});
