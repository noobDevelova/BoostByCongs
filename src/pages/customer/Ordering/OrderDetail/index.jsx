import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { PageHeader, OrderDetailCustomer } from "../../../../components";
import LinearBtn from "../../../../components/Button";

const OrderDetailScreen = ({ route, navigation }) => {
  const { orderData } = route.params;
  const { id } = orderData;

  const handleBack = () => {
    navigation.navigate("Pembelian");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader
          page="Order Detail"
          subPage={`Order ${id}`}
          onBackPress={handleBack}
        />
      </View>
      <View style={styles.body}>
        <OrderDetailCustomer orderData={orderData} />
      </View>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#BFBFBF",
  },
  body: {
    paddingHorizontal: 16,
    flex: 1,
  },

  btnWrapper: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
});
