import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListOrderHeader, OrderCardAdmin } from "../../../../components";
import { fetchAllOrderData } from "../../../../store/orders/thunks";

const BoostingOrder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [refreshing, setRefreshing] = useState(false);
  const orderData = useSelector((state) => state.orderData.orderData);
  const dispatch = useDispatch();

  const filteredOrder = orderData?.filter(
    (order) =>
      selectedStatus === "Semua" ||
      order.order_status.toLowerCase() === selectedStatus.toLowerCase()
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await dispatch(fetchAllOrderData());
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ListOrderHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </View>

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.cardWrapper}>
            {filteredOrder?.map((order) => (
              <OrderCardAdmin key={order.id} order={order} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BoostingOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#BFBFBF",
  },

  body: {
    paddingHorizontal: 16,
    flex: 1,
  },

  cardWrapper: {
    paddingVertical: 16,
    gap: 16,
  },
});
