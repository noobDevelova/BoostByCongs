import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import ListFrame from "../../List/ListFrame";
import ListBox from "../../List/ListBox";
import ListItem from "../../List/ListItem";

import {
  ArrowDown,
  ArrowUp,
  Bank,
  Chat,
  Finn,
  Message,
  More,
  ProfileBtn,
  Star,
  WaIcon,
  Wallet,
} from "../../../assets/icon";

import SheetFrame from "../../SheetFrame";
import fonts from "../../../utilities/fonts";
import FormInput from "../../Form/FormInput";
import LinearBtn from "../../Button";
import { useNavigation } from "@react-navigation/native";
import { formatTimestamp } from "../../../utilities/formatTimestamp";
import { formatPrice } from "../../../utilities/formatPrice";

const OrderDetailAdmin = ({ orderData }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [templateMessages, setTemplateMessages] = useState([]);
  const sheetChatRef = useRef(null);
  const navigation = useNavigation();

  const {
    id,
    order_detail,
    order_status,
    order_date,
    updatedAt,
    payment_details,
    cust_ingame_acc,
    cust_username,
    cust_phone_number,
    cust_uid,
  } = orderData;
  const {
    details,
    amount_stars,
    product_type,
    order_notes,
    request_hero,
    total_price,
  } = order_detail;
  const { item_name, price } = details;

  const statusMessage = {
    Pending: "Menunggu Konfirmasi",
    "On Process": "Sedang Diboosting",
    Done: "Boosting Selesai",
  };

  const checkProductType = product_type === "unit" ? "Boosting ke" : "Paket";
  const formatedOrderDate = formatTimestamp(order_date, "dd MMMM yyyy; hh:mm");
  const formatedUpdatedOrderDate = updatedAt
    ? formatTimestamp(updatedAt, "dd MMMM yyyy; hh:mm")
    : null;
  const reqHeroNames = request_hero.map((hero) => hero.name).join(", ");
  const reqHeroImage = request_hero.map((hero) => hero.img);
  const formatedPrice = formatPrice(price);
  const formatedTotalPrice = formatPrice(total_price);

  const forwardedData = {
    orderId: id,
    username: cust_username,
    ingameData: cust_ingame_acc,
  };

  const handleOpenSheet = () => {
    sheetChatRef?.current?.open();
  };

  const handleExpandText = (tempId) => {
    setTemplateMessages((prevMessages) =>
      prevMessages.map((item) =>
        item.tempId === tempId ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const sendMessageToWhatsapp = async () => {
    console.log(chatMessage);
    let userPhoneNumber = cust_phone_number.slice(1);

    if (chatMessage) {
      let url =
        "whatsapp://send?phone=62" + userPhoneNumber + "&text=" + chatMessage;

      try {
        await Linking.openURL(url);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Anda belum mengisi pesan!");
    }
  };

  useEffect(() => {
    if (order_status === "Pending") {
      setTemplateMessages([
        {
          tempId: 1,
          message: `Halo, dengan admin BoostByCongs disini. Kami ingin mengonfirmasi order Anda dengan kode ${orderData?.id}. Apakah Anda belum mengirim pembayaran? Terima kasih!`,
          expanded: false,
        },
        {
          tempId: 2,
          message: `Hi! Ini admin BoostByCongs. Kami akan memproses pesanan Anda dengan kode ${orderData?.id}. Apakah Anda sudah mengirim bukti pembayaran? Mohon konfirmasinya.`,
          expanded: false,
        },
        {
          tempId: 3,
          message: `Halo! Admin BoostByCongs ingin memastikan status pembayaran untuk order ${orderData?.id}. Apakah Anda sudah mengirimkan bukti pembayaran?`,
          expanded: false,
        },
      ]);
    } else if (order_status === "On Process") {
      setTemplateMessages([
        {
          tempId: 1,
          message: `Halo, dengan admin BoostByCongs disini. Kami ingin memberi tahu bahwa, keterangan akun ingame anda berbeda saat admin login, oleh karena itu kamu bisa refund.`,
          expanded: false,
        },
        {
          tempId: 2,
          message: `Hi! Admin BoostByCongs disini. Kami sedang memproses pesanan Anda dengan kode ${orderData?.id}. Mohon tidak login ke akun ingame Anda selama proses ini berlangsung.`,
          expanded: false,
        },
        {
          tempId: 3,
          message: `Halo! Kami dari admin BoostByCongs sedang menangani order Anda dengan kode ${orderData?.id}. Mohon bersabar, proses ini akan segera selesai.`,
          expanded: false,
        },
      ]);
    } else if (order_status === "Done") {
      setTemplateMessages([
        {
          tempId: 1,
          message: `Halo, dengan admin BoostByCongs disini. Kami ingin memberitahu bahwa pesanan Anda dengan kode ${orderData?.id} telah selesai. Terima kasih telah menggunakan layanan kami!`,
          expanded: false,
        },
        {
          tempId: 2,
          message: `Hi! Pesanan Anda dengan kode ${id} telah selesai diproses. Terima kasih atas kesabaran Anda. Kami berharap Anda puas dengan layanan kami.`,
          expanded: false,
        },
        {
          tempId: 3,
          message: `Halo! Pesanan Anda dengan kode ${id} telah selesai. Terima kasih telah menggunakan BoostByCongs!`,
          expanded: false,
        },
      ]);
    }
  }, [orderData]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.pageBody}>
          <ListFrame>
            <ListBox>
              <ListItem
                isDivide={false}
                status={order_status}
                value={statusMessage[order_status]}
              />
            </ListBox>
          </ListFrame>

          <ListFrame header="Informasi Order">
            <ListBox>
              <ListItem label="Order ID" value={id} isDivide={true} />
              <ListItem
                label="Order Date"
                value={formatedOrderDate}
                isDivide={updatedAt ? true : false}
              />

              {formatedUpdatedOrderDate && (
                <ListItem
                  label={
                    order_status === "On Process"
                      ? "Waktu konfirmasi"
                      : "Waktu selesai"
                  }
                  value={formatedUpdatedOrderDate}
                  isDivide={false}
                />
              )}
            </ListBox>
          </ListFrame>

          <ListFrame header="Detail customer">
            <ListBox>
              <ListItem
                Icon={ProfileBtn}
                isDivide={true}
                label="Nama Customer"
                value={cust_username}
              />
              <ListItem
                Icon={WaIcon}
                isDivide={false}
                label="No. Whatsapp"
                value={cust_phone_number}
                hasAction={true}
                IconAction={Chat}
                handleAction={handleOpenSheet}
              />
            </ListBox>
          </ListFrame>

          <ListFrame header="Detail boosting">
            <ListBox>
              <ListItem
                iconName={cust_ingame_acc?.rank}
                productType={product_type}
                isDivide={true}
                value={cust_ingame_acc.rank}
                optionalLabel={
                  cust_ingame_acc?.tier ? `Tier: ${cust_ingame_acc?.tier}` : "-"
                }
                IconLabel={Star}
                anotherValue={cust_ingame_acc?.star}
                type="acc"
                hasAction={true}
                IconAction={More}
                handleAction={() =>
                  navigation.navigate("IngameDetail", {
                    inGameDetailData: forwardedData,
                  })
                }
              />

              {product_type !== "unit" && (
                <ListItem
                  iconName={item_name}
                  label={checkProductType}
                  productType={product_type}
                  isDivide={product_type === "unit" ? true : false}
                  value={item_name}
                  type="product"
                />
              )}

              {product_type === "unit" && (
                <ListItem
                  Icon={Star}
                  isDivide={false}
                  label="Total"
                  value={`${amount_stars} Bintang`}
                />
              )}
            </ListBox>
          </ListFrame>

          <ListFrame header="Req Hero">
            <ListBox>
              <ListItem
                Icon={Finn}
                isDivide={false}
                value={reqHeroNames || "Random"}
                dataImg={reqHeroImage}
              />
            </ListBox>
          </ListFrame>

          <ListFrame header="Informasi Pembayaran">
            <ListBox>
              <ListItem
                Icon={
                  payment_details?.payment_via === "Transfer Bank"
                    ? Bank
                    : Wallet
                }
                isDivide={false}
                label={payment_details?.payment_via}
                value={payment_details?.sender_name}
              />
            </ListBox>
            <ListBox>
              <ListItem
                isDivide={false}
                label={
                  product_type === "unit" ? "Harga per bintang" : "Harga paket"
                }
                value={formatedPrice}
              />
              {product_type === "unit" && (
                <ListItem
                  isDivide={true}
                  label="Total bintang"
                  value={amount_stars}
                />
              )}
              <ListItem
                isDivide={false}
                label="Total harga"
                value={formatedTotalPrice}
              />
            </ListBox>
          </ListFrame>
        </View>
      </ScrollView>

      <SheetFrame ref={sheetChatRef}>
        <View style={styles.innerSheetWrapper}>
          <View style={styles.recipientProfile}>
            <WaIcon />
            <View style={{ gap: 4 }}>
              <Text style={styles.headerText}>Kirim pesan ke customer</Text>
              <Text style={styles.phoneNumber}>{cust_phone_number}</Text>
            </View>
          </View>
          <View>
            <Text style={[styles.headerText, { marginBottom: 10 }]}>
              Gunakan Template Pesan
            </Text>
            <View style={{ gap: 8 }}>
              {templateMessages?.map((item) => (
                <View style={styles.templateWrapper} key={item.tempId}>
                  <TouchableOpacity
                    style={styles.templateMessage}
                    onPress={() => setChatMessage(item.message)}
                  >
                    <Text
                      numberOfLines={item.expanded ? undefined : 1}
                      style={styles.messageText}
                      ellipsizeMode="tail"
                    >
                      {`"${item.message}"`}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleExpandText(item.tempId)}
                    style={{ marginLeft: "auto" }}
                  >
                    {item.expanded ? <ArrowUp /> : <ArrowDown />}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <FormInput
              frameType="sheet"
              value={chatMessage}
              onChange={setChatMessage}
              type="textarea"
              label="Pesan opsional"
            />

            <LinearBtn title="Kirim pesan" onPress={sendMessageToWhatsapp} />
          </View>
        </View>
      </SheetFrame>
    </View>
  );
};

export default OrderDetailAdmin;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  pageBody: {
    gap: 16,
    marginTop: 15,
    paddingBottom: 20,
  },
  recipientProfile: {
    paddingVertical: 16,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F8F9FD",
    borderRadius: 8,
    paddingHorizontal: 6,
  },

  headerText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
  },
  phoneNumber: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
  },

  innerSheetWrapper: {
    gap: 16,
    paddingVertical: 16,
  },

  inputWrapper: {
    gap: 12,
  },

  templateMessage: {
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 1,
  },

  messageText: {
    width: "93%",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  templateWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#F8F9FD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
