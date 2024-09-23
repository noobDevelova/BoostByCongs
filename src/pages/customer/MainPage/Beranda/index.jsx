import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Homepage } from "../../../../components";

const Beranda = () => {
  return (
    <View style={styles.container}>
      <Homepage />
    </View>
  );
};

export default Beranda;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FD",
    flex: 1,
  },
});
