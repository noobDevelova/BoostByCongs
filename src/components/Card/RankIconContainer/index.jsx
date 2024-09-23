import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ArrowRank } from "../../../assets/icon";
import { rankIcon } from "../../../utilities/ranksFormatter";

const RankIconContainer = ({ firstIcon, secondIcon }) => {
  const fIcon = rankIcon(firstIcon, 30);
  const sIcon = rankIcon(secondIcon, 25);

  return (
    <View style={styles.container}>
      <View style={styles.firstIconWrapper}>{fIcon}</View>
      <View style={styles.arrowWrapper}>
        <ArrowRank />
      </View>
      <View style={styles.secondIconRank}>{sIcon}</View>
    </View>
  );
};

export default RankIconContainer;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 50,
    height: 50,
  },
  firstIconWrapper: {
    position: "absolute",
    bottom: -7,
    left: -4,
  },
  arrowWrapper: {
    position: "absolute",
    right: 9,
    bottom: 4,
  },
  secondIconRank: {
    position: "absolute",
    top: -10,
    right: 4,
  },
});
