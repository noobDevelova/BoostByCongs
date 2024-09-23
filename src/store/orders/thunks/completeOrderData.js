import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FIREBASE_COLLECTION_ORDERS,
  FIREBASE_COLLECTION_USER_DETAIL,
} from "../../../config";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { sendPushNotifications } from "../../../utilities/sendPushNotification";
import fetchAllOrderData from "./fetchOrderData";

const completeOrderData = createAsyncThunk(
  "order/completeOrderData",
  async (orderId, { rejectWithValue, dispatch }) => {
    const orderDocRef = doc(FIREBASE_COLLECTION_ORDERS, orderId);

    try {
      await updateDoc(orderDocRef, {
        order_status: "Done",
        updatedAt: Timestamp.fromDate(new Date()),
        "cust_ingame_acc.isBoosted": false,
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
        isBoosted: false,
      });

      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const userDeviceTokens = userData.user_device_tokens;

      if (userDeviceTokens) {
        const notificateUser = userDeviceTokens.map((token) => {
          return sendPushNotifications(token, {
            title: `Boosting Telah Selesai!`,
            body: `Order dengan kode ${orderId} telah selesai`,
          });
        });

        await Promise.all(notificateUser);
      }

      dispatch(fetchAllOrderData());
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        message: error.message,
      });
    }
  }
);

export default completeOrderData;
