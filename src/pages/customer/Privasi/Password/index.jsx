import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PageHeader } from "../../../../components";

const PasswordSettings = () => {
  return (
    <View style={styles.container}>
      <PageHeader page="Password" subPage="Pengaturan Password" />
      <View style={styles.wrapper}></View>
    </View>
  );
};

export default PasswordSettings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
});
