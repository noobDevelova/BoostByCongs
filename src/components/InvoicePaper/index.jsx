import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import { Check, Import } from "../../assets/icon";
import fonts from "../../utilities/fonts";
import { formatTimestamp } from "../../utilities/formatTimestamp";
import { formatPrice } from "../../utilities/formatPrice";

const InvoicePaper = forwardRef(({ data }, ref) => {
  const { id, order_detail, updatedAt, payment_details } = data;

  const date = formatTimestamp(updatedAt, "MMM dd, yyyy");
  const time = formatTimestamp(updatedAt, "HH:mm");
  const total_price = formatPrice(order_detail?.total_price);

  return (
    <View style={styles.container} ref={ref} collapsable={false}>
      <View style={styles.paperContainer}>
        <View style={styles.paperHeader}>
          <View style={styles.successIcon}>
            <Check />
          </View>
          <Text style={styles.headerText}>Pembayaran Lunas!</Text>
          <View style={[styles.elipse, styles.elipseLeft]} />
          <View style={[styles.elipse, styles.elipseRight]} />
        </View>
        <View style={[{ height: 1, overflow: "hidden" }]}>
          <View style={styles.dashed} />
        </View>
        <View style={styles.paperBody}>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemLabel}>ID Order</Text>
            <Text style={styles.itemValue}>{id}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemLabel}>Tanggal</Text>
            <Text style={styles.itemValue}>{date}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemLabel}>Waktu</Text>
            <Text style={styles.itemValue}>{time}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemLabel}>Metode Pembayaran</Text>
            <Text style={styles.itemValue}>{payment_details?.payment_via}</Text>
          </View>
          <View style={[{ height: 1, overflow: "hidden" }]}>
            <View style={styles.dashed} />
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemLabel}>Total Harga</Text>
            <Text style={styles.itemValueBold}>{total_price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

export default InvoicePaper;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "#378FFF",
  },
  paperContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 24,
    overflow: "hidden",
  },
  paperHeader: {
    paddingVertical: 32,

    gap: 16,
  },
  paperBody: {
    paddingVertical: 32,
    gap: 14,
    borderBottomWidth: 1,
    borderColor: "#E8EAED",
  },

  successIcon: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: "rgba(35, 162, 109, 0.12)",
    alignSelf: "center",
  },

  headerText: {
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 28,
    textAlign: "center",
    color: "#121212",
  },

  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemLabel: {
    fontSize: fonts.size.font14 - 1,
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 18,
    color: "#707070",
  },

  itemValue: {
    fontSize: fonts.size.font14 - 1,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 18,
    color: "#121212",
  },

  itemValueBold: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 24,
    color: "#121212",
  },
  dashed: {
    height: 2,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#DCDEE0",
  },
  elipse: {
    width: 20,
    height: 20,
    backgroundColor: "#378FFF",
    borderRadius: 100,
    position: "absolute",
    top: 152,
  },

  elipseRight: {
    right: -35,
  },
  elipseLeft: {
    left: -35,
  },
});
