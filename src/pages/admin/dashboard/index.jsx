import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../../components";

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DashboardLayout />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
});
