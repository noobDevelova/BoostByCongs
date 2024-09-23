import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HeroCard = ({ name, role, img }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.dataImage} source={{ uri: "https:" + { img } }} />
      <Text>{name}</Text>
      <Text>{role}</Text>
    </View>
  );
};

export default HeroCard;

const styles = StyleSheet.create({});
