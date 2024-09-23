import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { IngameDetailLayout, PageHeader } from "../../../../components";

const IngameDetail = ({ route }) => {
  const { inGameDetailData } = route.params;

  useEffect(() => {
    console.log(inGameDetailData);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader page="Akun In Game" subPage="Detail" />
      </View>

      <IngameDetailLayout data={inGameDetailData} />
    </View>
  );
};

export default IngameDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 12,
  },
});
