import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DialogBox,
  OrderDetailAdmin,
  PageHeader,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  completeOrderData,
  confirmOrderData,
} from "../../../../store/orders/thunks";
import LinearBtn from "../../../../components/Button";

const OrderDetail = ({ route, navigation }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { orderData } = route.params;
  const dispatch = useDispatch();
  const { orderLoading } = useSelector((state) => state.orderData);

  const buttonTitle = {
    Pending: "Konfirmasi Boosting",
    "On Process": "Selesaikan Boosting",
  };

  const dialogTitle = {
    Pending: "Konfirmasi Boosting",
    "On Process": "Selesaikan Boosting",
  };

  const dialogMessage = {
    Pending:
      "Setelah ini, order boosting akan masuk ke tahap 'On Proses'. Mohon periksa pembayaran dari customer apakah sudah masuk.",
    "On Process":
      "Apakah kamu yakin untuk selesaikan boosting ini? Mohon cek kembali apakah sudah sesuai dengan order customer.",
  };

  const handleConfirmOrderData = async (orderId) => {
    try {
      setLoading(true);
      if (orderData?.order_status === "Pending") {
        await dispatch(confirmOrderData(orderId));
      }

      if (orderData?.order_status === "On Process") {
        await dispatch(completeOrderData(orderId));
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleCancel();
    }
  };

  const handleShow = () => {
    setShowDialog(true);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <View style={styles.container}>
      <DialogBox
        isVisible={showDialog}
        variant="warning"
        title={dialogTitle[orderData?.order_status]}
        message={dialogMessage[orderData?.order_status]}
        onCancel={handleCancel}
        onConfirm={handleConfirmOrderData}
        data={orderData.id}
        isLoading={isLoading || orderLoading}
      />
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 16,
          paddingBottom: 10,
        }}
      >
        <PageHeader page="Order" subPage={`Order ${orderData.id}`} />
      </View>

      <OrderDetailAdmin orderData={orderData} />
      {orderData?.order_status !== "Done" && (
        <View style={styles.btnWrapper}>
          <LinearBtn
            title={buttonTitle[orderData?.order_status]}
            onPress={() => handleShow()}
          />
        </View>
      )}
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnWrapper: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
});
