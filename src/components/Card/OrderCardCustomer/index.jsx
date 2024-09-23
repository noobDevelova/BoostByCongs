import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Boost, Star } from "../../../assets/icon";
import StatusBadge from "../../Badge/StatusBadge";
import { formatRank, rankIcon } from "../../../utilities/ranksFormatter";
import ProductBadge from "../../Badge/ProductBadge";
import fonts from "../../../utilities/fonts";
import RankIconContainer from "../RankIconContainer";
import { formatTimestamp } from "../../../utilities/formatTimestamp";
import { useNavigation } from "@react-navigation/native";

const OrderCustomer = ({ order }) => {
  const navigation = useNavigation();

  const { order_status, order_date } = order;
  const { total_price, amount_stars, details, product_type } =
    order?.order_detail;
  const { item_name } = details;
  const orderDate = formatTimestamp(order_date, "dd MMMM yyyy");
  const price = total_price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const boostingRank = formatRank(product_type, item_name);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.iconWrapper}>
          <Boost />
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.productLabel}>Boosting</Text>
          <Text style={styles.orderDate}>{orderDate}</Text>
        </View>
        <StatusBadge status={order_status} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.productImage}>
          {product_type === "unit" ? (
            rankIcon(boostingRank, 40)
          ) : (
            <RankIconContainer
              firstIcon={boostingRank?.firstIcon}
              secondIcon={boostingRank?.secondIcon}
            />
          )}
        </View>
        <View style={styles.boostOverview}>
          <View style={styles.boostProduct}>
            <Text style={styles.productName}>{item_name}</Text>
            <ProductBadge type={product_type} />
          </View>
          {product_type === "unit" && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={styles.amountStar}>{amount_stars}</Text>
              <Star />
            </View>
          )}
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style>
          <Text style={styles.priceLabel}>Total harga: </Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <TouchableOpacity
          style={styles.btnCard}
          onPress={() =>
            navigation.navigate("OrderDetail", { orderData: order })
          }
        >
          <Text style={styles.btnCardText}>Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCustomer;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    borderRadius: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DEDBDB",
    paddingBottom: 10,
  },

  iconWrapper: {
    marginRight: 10,
  },

  headingContainer: {
    flexDirection: "column",
    gap: 2,
    marginRight: "auto",
  },

  cardBody: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 13,
  },

  boostOverview: {
    flex: 1,
    flexDirection: "column",
  },

  boostProduct: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productLabel: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
  },
  orderDate: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    color: "#B6B6BB",
  },

  productName: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
  },

  amountStar: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
  },
  priceLabel: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
  },

  price: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 25,
  },
  productImage: {
    width: 50,
    height: 50,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  btnCard: {
    backgroundColor: "#378FFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },

  btnCardText: {
    color: "#fff",
    fontFamily: fonts.fontFamily.medium,
  },
});
