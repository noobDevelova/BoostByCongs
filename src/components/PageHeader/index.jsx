import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ArrowBack } from "../../assets/icon";
import ButtonIcon from "../ButtonIcon";
import fonts from "../../utilities/fonts";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

const PageHeader = ({ page, subPage, onBackPress }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subPageTitle}>{subPage}</Text>
      <View style={styles.subWrapper}>
        <ButtonIcon Icon={ArrowBack} onPress={handleNavigate} />
        <Text style={styles.pageTitle}>{page}</Text>
      </View>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight + 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.bold,
    color: "#181D27",
  },
  subWrapper: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  subPageTitle: {
    fontFamily: fonts.fontFamily.medium,
    fontSize: fonts.size.font18,
    color: "#181D27",
  },
});
