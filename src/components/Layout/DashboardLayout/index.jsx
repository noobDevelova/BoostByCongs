import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HomeHeader from "../../HomeHeader";
import FeaturedCard from "../../Card/FeaturedCard";
import { Box, Load, Stat, Users } from "../../../assets/icon";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../../utilities/formatPrice";
import ListFrame from "../../List/ListFrame";
import IncomingCard from "../../Card/IncomingCard";
import { fetchAllOrderData } from "../../../store/orders/thunks";

const DashboardLayout = () => {
  const { orderData } = useSelector((state) => state.orderData);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const orderDone =
    orderData?.filter((item) => item.order_status === "Done")?.length ?? 0;

  const orderPending = orderData?.filter(
    (item) => item.order_status === "Pending"
  );

  const orderPendingLength = orderPending?.length ?? 0;

  const orderProcess =
    orderData?.filter((item) => item.order_status === "On Process")?.length ??
    0;

  const salarySum =
    orderData
      ?.filter(
        (item) =>
          item.order_status === "Done" || item.order_status === "On Process"
      )
      ?.reduce((acc, item) => acc + item.order_detail.total_price, 0) ?? 0;

  const formattedPrice = formatPrice(salarySum);

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
    <>
      <HomeHeader />

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.cardContainer}>
            <View style={styles.cardWrapper}>
              <FeaturedCard
                title="On Process"
                value={orderProcess}
                Icon={Users}
              />
              <FeaturedCard title="Selesai" value={orderDone} Icon={Box} />
            </View>
            <View style={styles.cardWrapper}>
              <FeaturedCard
                title="Pending"
                value={orderPendingLength}
                Icon={Load}
              />
              <FeaturedCard
                title="Pendapatan"
                value={formattedPrice}
                Icon={Stat}
              />
            </View>
          </View>

          <ListFrame header="Pending">
            {orderPendingLength > 0 ? (
              <ScrollView
                horizontal={true}
                contentContainerStyle={{ gap: 5 }}
                showsHorizontalScrollIndicator={false}
              >
                {orderPending.map((item) => (
                  <IncomingCard key={item.id} data={item} />
                ))}
              </ScrollView>
            ) : (
              <Text>Tidak ada order terbaru saat ini.</Text>
            )}
          </ListFrame>
        </ScrollView>
      </View>
    </>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    flex: 1,
  },
  cardContainer: {
    gap: 5,
    marginTop: 10,
    flexDirection: "column",
  },

  cardWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
});
