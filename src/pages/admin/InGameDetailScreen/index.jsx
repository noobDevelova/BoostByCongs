import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { IngameDetailLayout, PageHeader } from "../../../components";

const IngameDetail = ({ route }) => {
  const { inGameDetailData } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader page={inGameDetailData.orderId} subPage="Detail akun" />
      </View>
      <IngameDetailLayout data={inGameDetailData?.ingameData} />
    </View>
  );
};

export default IngameDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#8E8E93",
  },
});
