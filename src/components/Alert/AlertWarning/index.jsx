import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AlertWarningIcon } from "../../../assets/icon";
import fonts from "../../../utilities/fonts";

const AlertWarning = ({ title, subTitle, onPress, btnTitle }) => {
  return (
    <View style={styles.container}>
      <AlertWarningIcon />
      <View style={styles.textContainer}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertSubTitle}>{subTitle}</Text>

        {btnTitle && (
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.linkBtn}>{btnTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AlertWarning;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFF3E0",
    gap: 8,
    borderRadius: 8,
    borderColor: "#FF9800",
    borderWidth: 1,
  },
  textContainer: {
    gap: 4,
    flexDirection: "column",
    flex: 1,
  },
  alertTitle: {
    color: "#263238",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 20,
  },
  alertSubTitle: {
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    color: "#546E7A",
    lineHeight: 20,
  },
  linkBtn: {
    color: "#546E7A",
    textDecorationLine: "underline",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    marginTop: 8,
  },
});
