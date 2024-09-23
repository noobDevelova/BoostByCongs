import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FIREBASE_COLLECTION_ORDERS,
  FIREBASE_COLLECTION_USER_DETAIL,
} from "../../../config";
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  collection,
} from "firebase/firestore";
import { sendPushNotifications } from "../../../utilities/sendPushNotification";
import fetchAllOrderData from "./fetchOrderData";

const confirmOrderData = createAsyncThunk(
  "order/confirmOrderData",
  async (orderId, { rejectWithValue, dispatch }) => {
    const orderDocRef = doc(FIREBASE_COLLECTION_ORDERS, orderId);

    try {
      await updateDoc(orderDocRef, {
        order_status: "On Process",
        updatedAt: Timestamp.fromDate(new Date()),
        "cust_ingame_acc.isBoosted": true,
      });

      const orderDoc = await getDoc(orderDocRef);
      const orderData = orderDoc.data();

      const userDocRef = doc(
        FIREBASE_COLLECTION_USER_DETAIL,
        orderData.cust_uid
      );
      const userIngameAccRef = collection(userDocRef, "ingame_account");
      const ingameAccountRef = doc(
        userIngameAccRef,
        orderData.cust_ingame_acc.id
      );

      await updateDoc(ingameAccountRef, {
        isBoosted: true,
      });

      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const userDeviceTokens = userData.user_device_tokens;

      if (userDeviceTokens) {
        const notificateUser = userDeviceTokens.map((token) => {
          return sendPushNotifications(token, {
            title: `Order Di Konfirmasi`,
            body: `Order dengan kode ${orderId} telah dikonfirmasi!`,
          });
        });
        await Promise.all(notificateUser);
      }

      dispatch(fetchAllOrderData());
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        error_message: error.message,
      });
    }
  }
);

export default confirmOrderData;
