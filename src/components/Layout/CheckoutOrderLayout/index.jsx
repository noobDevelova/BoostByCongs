import {
  BackHandler,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import ListFrame from "../../List/ListFrame";
import ListBox from "../../List/ListBox";
import ListItem from "../../List/ListItem";

import { Star, Finn } from "../../../assets/icon";
import { Formik } from "formik";
import FormSelect from "../../Form/FormSelect";
import FormInput from "../../Form/FormInput";

import {
  initialPaymentMethodScheme,
  usePaymentValidateScheme,
} from "../../../schema/usePaymentMethodSchema";
import LinearBtn from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import KeyboardAvoidingContainer from "../../KeyboardAvoidingContainer";
import {
  clearTemporaryOrder,
  updateTemporaryOrder,
} from "../../../store/user/thunks";
import { addOrderData } from "../../../store/orders/thunks";
import { useNavigation } from "@react-navigation/native";
import DialogBox from "../../DialogBox";

const CheckoutOrderLayout = ({ orderData }) => {
  const [customerNotes, setCustomerNotes] = useState("");
  const navigation = useNavigation();
  const { userDetail } = useSelector((state) => state.userData);
  const [isConfirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [paymentData, setPaymentData] = useState(null);

  const user_uid = useSelector((state) => state.auth.currentUser.uid);
  const dispatch = useDispatch();

  const checkProductType =
    orderData?.order_detail?.product_type === "unit" ? "Boosting ke" : "Paket";

  const reqHeroNames = orderData?.order_detail?.request_hero
    .map((hero) => hero.name)
    .join(", ");

  const reqHeroImage = orderData?.order_detail?.request_hero.map(
    (hero) => hero.img
  );

  const paymentMethod = [
    { key: "1", value: "Transfer Bank" },
    { key: "2", value: "E-Wallet" },
  ];

  const confirmOrder = async (paymentData) => {
    try {
      setLoading(true);
      const orderData = {
        cust_uid: user_uid,
        cust_username: userDetail.username,
        cust_phone_number: userDetail.phone_number,
        payment_details: paymentData,
        order_detail: {
          order_notes: "",
        },
      };

      if (customerNotes) {
        orderData.order_detail.order_notes = customerNotes;
      }

      if (
        orderData?.order_detail?.amount_stars &&
        orderData?.order_detail?.product_type === "Paket"
      ) {
        delete orderData?.order_detail?.amount_stars;
      }

      await dispatch(updateTemporaryOrder(orderData));
      await dispatch(addOrderData());
      navigation.navigate("SuccessOrder");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleCloseConfirmDialog();
    }
  };

  const handleShowConfirmDialog = () => {
    setConfirmDialogVisible(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogVisible(false);
  };

  const isTierAvailable = orderData?.cust_ingame_acc?.tier
    ? `Tier: ${orderData?.cust_ingame_acc?.tier}`
    : "-";

  return (
    <KeyboardAvoidingContainer>
      <View style={styles.container}>
        <ListFrame header="Detail boosting">
          <ListBox>
            <ListItem
              iconName={orderData?.cust_ingame_acc?.rank}
              productType={orderData?.order_detail?.product_type}
              isDivide={true}
              value={orderData?.cust_ingame_acc?.rank}
              optionalLabel={isTierAvailable}
              IconLabel={Star}
              anotherValue={orderData?.cust_ingame_acc?.star}
              type="acc"
            />
            {orderData?.order_detail?.product_type !== "unit" && (
              <ListItem
                iconName={orderData?.order_detail?.details?.item_name}
                label={checkProductType}
                productType={orderData?.order_detail?.product_type}
                isDivide={
                  orderData?.order_detail?.product_type === "unit"
                    ? true
                    : false
                }
                value={orderData?.order_detail?.details?.item_name}
                type="product"
              />
            )}

            {orderData?.order_detail?.product_type === "unit" && (
              <ListItem
                Icon={Star}
                isDivide={false}
                label="yang di order"
                value={`${orderData?.order_detail?.amount_stars} Bintang`}
                productType={orderData?.order_detail?.product_type}
                iconName={orderData?.order_detail?.details?.item_name}
                type="product"
              />
            )}
          </ListBox>
        </ListFrame>

        <ListFrame header="Request Hero">
          <ListBox>
            <ListItem
              Icon={Finn}
              isDivide={false}
              value={reqHeroNames || "Penjoki akan memilih random"}
              dataImg={reqHeroImage}
            />
          </ListBox>
        </ListFrame>

        <ListFrame header="Informasi Pembayaran">
          <ListBox>
            <ListItem
              isDivide={false}
              label={
                orderData?.order_detail?.product_type === "unit"
                  ? "Harga per bintang"
                  : "Harga paket"
              }
              value={orderData?.order_detail?.details?.price.toLocaleString(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              )}
            />

            {orderData?.order_detail?.product_type === "unit" && (
              <ListItem
                isDivide={true}
                label="Total bintang"
                value={orderData?.order_detail?.amount_stars}
              />
            )}
            <ListItem
              isDivide={false}
              label="Total harga"
              value={orderData?.order_detail?.total_price?.toLocaleString(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              )}
            />
          </ListBox>
        </ListFrame>

        <ListFrame header="Catatan untuk penjoki">
          <FormInput
            type="textarea"
            value={customerNotes}
            onChange={setCustomerNotes}
            label="Catatan"
          />
        </ListFrame>

        <ListFrame header="Metode Pembayaran">
          <Formik
            initialValues={initialPaymentMethodScheme}
            validationSchema={usePaymentValidateScheme}
            onSubmit={(values) => {
              setPaymentData(values);
              handleShowConfirmDialog();
            }}
            validateOnChange={false}
          >
            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
              <View style={styles.inputContainer}>
                <FormSelect
                  data={paymentMethod}
                  setSelected={handleChange("payment_via")}
                  placeholder="Pilih metode pembayaran"
                  msg={!isSubmitting && errors.payment_via}
                />

                <FormInput
                  label="Nama Pengirim"
                  type="text"
                  onChange={handleChange("sender_name")}
                  value={values.sender_name}
                  msg={!isSubmitting && errors.sender_name}
                />
                <LinearBtn
                  title="Konfirmasi Boosting"
                  onPress={() => handleSubmit()}
                />
              </View>
            )}
          </Formik>
        </ListFrame>
      </View>
      <DialogBox
        variant="info"
        isVisible={isConfirmDialogVisible}
        title="Konfirmasi Order"
        message="Apakah Anda yakin ingin mengonfirmasi order ini? Pastikan semua informasi sudah benar sebelum melanjutkan."
        onCancel={handleCloseConfirmDialog}
        data={paymentData}
        onConfirm={confirmOrder}
        isLoading={isLoading}
      />
    </KeyboardAvoidingContainer>
  );
};

export default CheckoutOrderLayout;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 13,
  },
  container: {
    gap: 10,
    paddingVertical: 16,
  },
});
