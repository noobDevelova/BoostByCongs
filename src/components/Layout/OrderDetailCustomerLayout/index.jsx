import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AlertInfo from "../../Alert/AlertInfo";
import ListFrame from "../../List/ListFrame";
import ListBox from "../../List/ListBox";
import ListItem from "../../List/ListItem";
import { formatTimestamp } from "../../../utilities/formatTimestamp";
import {
  ArrowDown,
  ArrowUp,
  Chat,
  Finn,
  Star,
  WaIcon,
} from "../../../assets/icon";
import PaymentCard from "../../Card/PaymentCard";
import SheetFrame from "../../SheetFrame";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import FormInput from "../../Form/FormInput";
import LinearBtn from "../../Button";
import fonts from "../../../utilities/fonts";
import { formatPrice } from "../../../utilities/formatPrice";
import { useNavigation } from "@react-navigation/native";

const OrderDetailCustomer = ({ orderData }) => {
  const navigation = useNavigation();
  const [templateMessages, setTemplateMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const sheetRef = useRef(null);
  const {
    order_status,
    order_date,
    updatedAt,
    order_detail,
    id,
    cust_ingame_acc,
  } = orderData;
  const formatedOrderDate = formatTimestamp(order_date, "dd MMMM yyyy; hh:mm");
  const formatedUpdatedOrderDate = updatedAt
    ? formatTimestamp(updatedAt, "dd MMMM yyyy; hh:mm")
    : null;
  const { amount_stars, request_hero, details, product_type, total_price } =
    order_detail;
  const { rank, tier, star } = cust_ingame_acc;
  const { price, item_name } = details;

  const checkProductType = product_type === "unit" ? "Boosting ke" : "Paket";
  const reqHeroNames = request_hero.map((hero) => hero.name).join(", ");
  const reqHeroImage = request_hero.map((hero) => hero.img);

  const pricePerStar = formatPrice(price);

  const totalPrice = formatPrice(total_price);

  const statusMessage = {
    Pending: "Menunggu Konfirmasi",
    "On Process": "Sedang Diboosting",
    Done: "Boosting Selesai",
  };

  const titleMessage = {
    Pending: "Menunggu Konfirmasi Admin",
    "On Process": "Sedang Di Boost",
    Done: "Boosting Selesai",
  };

  const infoMessage = {
    Pending:
      "Mohon selesaikan pembayaran untuk melanjutkan pesanan Anda. Jika Anda merasa sudah membayar, silakan abaikan pesan ini. Kami akan segera memproses pesanan Anda setelah pembayaran dikonfirmasi.",
    "On Process":
      "Akun Anda sedang di-boost oleh tim kami. Proses ini mungkin memakan waktu, jadi mohon bersabar. Kami akan memberikan update begitu boosting selesai. Diharapkan TIDAK LOGIN ke akun ingame kamu selama proses boosting.",
    Done: "Pesanan Anda telah selesai diproses. Terima kasih telah menggunakan layanan kami! Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.",
  };

  const handleExpandText = (tempId) => {
    setTemplateMessages((prevMessages) =>
      prevMessages.map((item) =>
        item.tempId === tempId ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const handleOpenSheet = () => {
    sheetRef?.current?.open();
  };

  const sendMessageToWhatsapp = async () => {
    console.log(chatMessage);
    let userPhoneNumber = "81212005364";

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
    if (orderData?.order_status === "Pending") {
      setTemplateMessages([
        {
          tempId: 1,
          message: `Halo admin BoostByCongs, saya ingin mengirim bukti pembayaran untuk order dengan kode ${orderData?.id}. Berikut saya lampirkan screenshot pembayaran. Mohon konfirmasinya. Terima kasih!`,
          expanded: false,
        },
        {
          tempId: 2,
          message: `Hi admin BoostByCongs! Saya sudah melakukan pembayaran untuk order dengan kode ${orderData?.id}. Ini screenshot bukti pembayarannya. Mohon diproses, terima kasih.`,
          expanded: false,
        },
        {
          tempId: 3,
          message: `Halo admin BoostByCongs, saya baru saja membayar untuk order ${orderData?.id}. Saya lampirkan screenshot bukti pembayaran. Mohon konfirmasinya, terima kasih.`,
          expanded: false,
        },
      ]);
    }
  }, [orderData]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <AlertInfo
          title={titleMessage[order_status]}
          subTitle={infoMessage[order_status]}
        />
        <View style={styles.listWrapper}>
          <ListFrame>
            <ListBox>
              <ListItem
                isDivide={false}
                status={order_status}
                value={statusMessage[order_status]}
              />
            </ListBox>
            {order_status === "Pending" && <PaymentCard price={total_price} />}
          </ListFrame>

          {order_status === "Pending" && (
            <ListFrame header="Kirim Bukti Pembayaran">
              <ListBox>
                <ListItem
                  Icon={WaIcon}
                  isDivide={false}
                  label="Admin"
                  value="Boost by Congs"
                  hasAction={true}
                  IconAction={Chat}
                  handleAction={handleOpenSheet}
                />
              </ListBox>
            </ListFrame>
          )}

          <ListFrame header="Informasi Order">
            <ListBox>
              <ListItem label="ID Order" value={id} isDivide={true} />
              <ListItem
                label="Waktu Order"
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

          <ListFrame header="Detail boosting">
            <ListBox>
              <ListItem
                iconName={rank}
                productType={product_type}
                isDivide={true}
                value={rank}
                optionalLabel={tier ? `Tier: ${tier}` : "-"}
                IconLabel={Star}
                anotherValue={star}
                type="acc"
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
                isDivide={false}
                label={
                  product_type === "unit" ? "Harga per bintang" : "Harga paket"
                }
                value={pricePerStar}
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
                value={totalPrice}
              />
            </ListBox>
            {(order_status === "On Process" || order_status === "Done") && (
              <LinearBtn
                title="Lihat Invoice"
                onPress={() =>
                  navigation.navigate("Invoice", { orderData: orderData })
                }
              />
            )}
          </ListFrame>
        </View>
      </ScrollView>

      <SheetFrame ref={sheetRef}>
        <View style={styles.innerSheetWrapper}>
          <View style={styles.recipientProfile}>
            <WaIcon />
            <View style={{ gap: 4 }}>
              <Text style={styles.headerText}>Kirim pesan ke admin</Text>
              <Text style={styles.phoneNumber}>
                {orderData?.cust_phone_number}
              </Text>
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

export default OrderDetailCustomer;

const styles = StyleSheet.create({
  listWrapper: {
    gap: 10,
    marginTop: 10,
  },
  container: {
    paddingVertical: 16,
  },
  innerSheetWrapper: {
    gap: 16,
    paddingVertical: 16,
  },

  recipientProfile: {
    paddingVertical: 16,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F8F9FD",
    borderRadius: 8,
    paddingHorizontal: 6,
  },

  inputWrapper: {
    gap: 12,
  },
  headerText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
  },
  phoneNumber: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
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
