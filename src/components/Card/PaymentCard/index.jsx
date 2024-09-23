import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Copy, Transfer } from "../../../assets/icon";
import fonts from "../../../utilities/fonts";
import { BCA } from "../../../assets/img";
import * as Clipboard from "expo-clipboard";
import { useNotifications } from "react-native-notificated";

const PaymentCard = ({ price }) => {
  const { notify } = useNotifications();

  const totalPrice = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const noRekening = "0030972392";

  const copyRek = async () => {
    await Clipboard.setStringAsync(noRekening);

    notify("toast", {
      params: {
        title: "No. Rekening",
      },
      config: {
        duration: 2000,
      },
    });
  };

  const copyPrice = async () => {
    await Clipboard.setStringAsync(toString(price));
    notify("toast", {
      params: {
        title: "Total tagihan",
      },
      config: {
        duration: 2000,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Transfer />
        <Text style={styles.headerText}>Kirim Pembayaran ke</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardItem}>
          <View style={styles.flexRow}>
            <View style={styles.flexCol}>
              <Text style={styles.label}>Nomor Rekening</Text>
              <View style={styles.flexRow}>
                <Text style={styles.highlight}>{noRekening}</Text>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={copyRek}>
                  <Copy width={17} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.iconWrapper}>
              <BCA width={30} />
            </View>
          </View>
          <Text style={styles.label}>
            Penerima: <Text style={styles.highlight}>ferdiansyah</Text>
          </Text>
        </View>
        <View style={styles.cardItem}>
          <Text style={styles.label}>Total Tagihan</Text>
          <View style={styles.flexRow}>
            <Text style={styles.highlight}>{totalPrice}</Text>
            <TouchableOpacity style={{ marginLeft: 5 }} onPress={copyPrice}>
              <Copy width={17} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.dotted}>{"\u2B23" + " "}</Text>
          <Text style={styles.infoText}>
            Jika kamu sudah transfer ke nomor Virtual Account, mohon kirim bukti
            pembayaran ke WhatsApp di bawah ini.
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.dotted}>{"\u2B23" + " "}</Text>
          <Text style={styles.infoText}>
            Transaksi kamu dikonfirmasi setelah admin menerima pembayaran Anda.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "column",
    borderRadius: 8,
  },

  cardHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBF0",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerText: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
  },

  highlight: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#000",
  },

  label: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
    color: "#8E8E93",
  },

  cardBody: {
    flexDirection: "column",
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBF0",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  flexCol: {
    flexDirection: "column",
  },

  iconWrapper: {
    marginLeft: "auto",
  },
  cardFooter: {
    flexDirection: "column",
    gap: 5,
    paddingVertical: 10,
  },

  dotted: {
    color: "#4E4E50",
  },

  infoText: {
    color: "#4E4E50",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
  },
});
