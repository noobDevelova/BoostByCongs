import {
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ListOrderHeader, OrderCustomer } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../../../store/user/thunks";
import { fetchAllOrderData } from "../../../../store/orders/thunks";

const Pembelian = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [refreshing, setRefreshing] = useState(false);
  const { userOrders, userLoading } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await dispatch(fetchAllOrderData());
      await dispatch(fetchUserOrders());
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const filteredOrder = userOrders?.filter(
    (order) =>
      selectedStatus === "Semua" ||
      order.order_status.toLowerCase() === selectedStatus.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ListOrderHeader
          searchQuery={searchQuery}
          selectedStatus={selectedStatus}
          setSearchQuery={setSearchQuery}
          setSelectedStatus={setSelectedStatus}
        />
      </View>
      <View style={styles.body}>
        {userLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.cardWrapper}>
              {filteredOrder?.map((order) => (
                <OrderCustomer key={order.id} order={order} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Pembelian;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#BFBFBF",
  },

  container: {
    backgroundColor: "#F8F9FD",
    flex: 1,
  },

  body: {
    paddingHorizontal: 16,
    flex: 1,
  },

  cardWrapper: {
    gap: 10,
    paddingVertical: 16,
  },
});
