import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { formatRank, rankIcon } from "../../../utilities/ranksFormatter";
import RankIconContainer from "../RankIconContainer";
import { Boost, ClockFlat, Star } from "../../../assets/icon";
import StatusBadge from "../../Badge/StatusBadge";
import { formatTimestamp } from "../../../utilities/formatTimestamp";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../../utilities/fonts";

const IncomingCard = ({ data }) => {
  const navigation = useNavigation();
  const order_status = data?.order_status;
  const product_type = data?.order_detail?.product_type;
  const item_name = data?.order_detail?.details?.item_name;
  const star = data?.order_detail?.amount_stars;
  const icon = formatRank(product_type, item_name);

  const iconRank =
    product_type === "unit" || !item_name.includes("-") ? (
      rankIcon(icon, 40)
    ) : (
      <RankIconContainer
        firstIcon={icon.firstIcon}
        secondIcon={icon.secondIcon}
      />
    );
  const formattedTime = formatTimestamp(data?.order_date, "dd MMMM hh:mm");

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>{iconRank}</View>
      <View style={styles.cardContent}>
        <View style={styles.cardItem}>
          <View style={styles.cardItemIcon}>
            <ClockFlat width={15} />
          </View>
          <Text style={styles.itemText}>{formattedTime}</Text>
        </View>

        <View style={styles.cardItem}>
          <View style={styles.cardItemIcon}>
            <Star />
          </View>
          <Text style={styles.itemText}>{star || "-"}</Text>
        </View>

        <View style={styles.cardItem}>
          <StatusBadge status={order_status} />
        </View>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OrderDetail", { orderData: data })
          }
        >
          <Text style={styles.btnText}>Proses Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IncomingCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    padding: 16,
    borderRadius: 8,
  },
  cardHeader: {
    alignItems: "center",
    gap: 8,
    height: 45,
    marginBottom: 5,
  },
  cardContent: {
    marginTop: 10,
    gap: 8,
  },
  cardItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  cardItemIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
  },
  cardFooter: {
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
  },
  itemText: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
  },
});
