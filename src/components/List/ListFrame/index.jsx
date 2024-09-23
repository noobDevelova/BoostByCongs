import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../../utilities/fonts";

const ListFrame = ({ children, header }) => {
  return (
    <View style={styles.listWrapper}>
      {header && <Text style={styles.listHeader}>{header}</Text>}
      {children}
    </View>
  );
};

export default ListFrame;

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: "column",
    gap: 8,
  },
  listHeader: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 21,
  },
});
