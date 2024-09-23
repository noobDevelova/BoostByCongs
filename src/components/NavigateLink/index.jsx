import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../utilities/fonts";

const NavigateLink = ({ title, linkTitle, linkTo }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.navigate}>
      <Text style={styles.btnLinkTitle}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(linkTo)}>
        <Text style={styles.btnLink}>{linkTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigateLink;

const styles = StyleSheet.create({
  navigate: {
    flexDirection: "row",
    gap: 5,
    alignSelf: "center",
  },
  btnLinkTitle: {
    color: "#000000",
    fontFamily: fonts.fontFamily.medium,
  },
  btnLink: {
    color: "#152DFF",
    fontFamily: fonts.fontFamily.bold,
  },
});
