import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import fonts from "../../../utilities/fonts";
import {
  ArrowDetail,
  ArrowOrder,
  Clock,
  ProfileBtn,
  Star,
} from "../../../assets/icon";

import { useNavigation } from "@react-navigation/native";
import { formatRank, rankIcon } from "../../../utilities/ranksFormatter";
import RankIconContainer from "../RankIconContainer";
import ProductBadge from "../../Badge/ProductBadge";
import { formatTimestamp } from "../../../utilities/formatTimestamp";

const OrderCardAdmin = ({ order }) => {
  const navigation = useNavigation();
  const { id, order_status, cust_username, order_date, order_detail } = order;
  const { product_type, details, amount_stars } = order_detail;
  const { item_name } = details;

  const statusWrite = {
    Pending:
      "Customer menunggu konfirmasi. Cek apakah pembayaran sudah masuk dan segera lakukan konfirmasi.",
    "On Process":
      "Anda sedang boost akun Mobile Legends customer. Selesaikan proses dan update status order ini.",
    Done: "Boosting selesai. Kirim bukti perubahan data akun in-game ke WhatsApp customer.",
  };

  const statusLabel = {
    Pending: "Menunggu Konfirmasi",
    "On Process": "Sedang Boosting",
    Done: "Boosting Selesai",
  };

  const date = formatTimestamp(order_date, "dd MMMM; HH:mm");
  const icon = formatRank(product_type, item_name);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#F2C94C" };
      case "On Process":
        return { backgroundColor: "#0265DC" };
      case "Done":
        return { backgroundColor: "#50504E" };
      default:
        return { backgroundColor: "#FFFFFF" }; // default color
    }
  };
  const badgeStyle = getStatusColor(order_status);

  const iconRank =
    product_type === "unit" || !item_name.includes("-") ? (
      rankIcon(icon, 40)
    ) : (
      <RankIconContainer
        firstIcon={icon.firstIcon}
        secondIcon={icon.secondIcon}
      />
    );

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={styles.statusDesc}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: badgeStyle.backgroundColor },
            ]}
          />
          <View style={{ marginLeft: 1, gap: 3 }}>
            <Text style={styles.statusText}>
              {order_status} - {statusLabel[order_status]}
            </Text>
            <Text style={styles.orderCode}>{id}</Text>
            <Text style={styles.custName}>{cust_username}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 3,
          }}
        >
          <Text style={styles.orderCode}>Waktu Order</Text>
          <View
            style={[
              styles.dateBadge,
              { backgroundColor: badgeStyle.backgroundColor },
            ]}
          >
            <Clock width={15} />
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.info}>
          <Text style={styles.textInfo}>{statusWrite[order_status]}</Text>
        </View>
      </View>
      <View style={styles.productContent}>
        <View style={styles.iconWrapper}>{iconRank}</View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.productName}>{item_name}</Text>
            <ProductBadge type={product_type} />
          </View>
          {product_type === "unit" && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.amountStar}>{amount_stars}</Text>
              <Star />
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnCard}
        onPress={() => navigation.navigate("OrderDetail", { orderData: order })}
      >
        <Text style={styles.btnText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderCardAdmin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 10,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#DEDBDB",
    paddingBottom: 10,
    paddingTop: 3,
  },

  statusBadge: {
    position: "absolute",
    left: -10,
    top: 0,
    bottom: 0,
    width: 5,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  dateBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 100,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  date: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
    color: "#fff",
  },

  statusText: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.semiBold,
  },
  orderCode: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
    color: "#8E8E93",
  },
  custName: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
    color: "#8E8E93",
  },
  info: {
    backgroundColor: "#CFF1FF",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D8D8D9",
  },

  textInfo: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
  },

  productContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  productName: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 23,
  },

  btnCard: {
    borderWidth: 1.5,
    borderColor: "#378FFF",
    borderRadius: 6,
    paddingVertical: 5,
    marginBottom: 7,
  },
  btnText: {
    textAlign: "center",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#378FFF",
  },
  amountStar: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
  },
});
