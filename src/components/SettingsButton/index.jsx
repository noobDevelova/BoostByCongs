import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import fonts from "../../utilities/fonts";
import { ArrowR, Warning } from "../../assets/icon";
import ButtonIcon from "../ButtonIcon";
import { FIREBASE_AUTH } from "../../config";

const SettingsButton = ({
  Icon,
  heading,
  subHeading,
  status,
  navigation,
  type,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        {status && <Warning style={styles.warning} />}
        <Icon style={styles.icon} />
      </View>
      <View>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{status ? status : subHeading}</Text>
      </View>
      <View style={styles.btn}>
        {type === "linking" ? (
          <ButtonIcon
            Icon={ArrowR}
            navigateTo={navigation}
            type={type}
            onPress={onPress}
          />
        ) : (
          <ButtonIcon
            Icon={ArrowR}
            navigateTo={navigation}
            type={type}
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#F8F9FD",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ABABAB",
    marginRight: 16,
    position: "relative",
  },
  icon: {
    alignSelf: "center",
    position: "absolute",
    top: 9,
  },
  heading: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
  },
  subHeading: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
    color: "#ABABAB",
  },
  warning: {
    position: "absolute",
    top: -5,
    left: -8,
  },
  btn: {
    marginLeft: "auto",
  },
});
