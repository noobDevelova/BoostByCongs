import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_ORDERS } from "../../../config";
import {
  Timestamp,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { sendPushNotifications } from "../../../utilities/sendPushNotification";
import fetchAllOrderData from "./fetchOrderData";
import { clearTemporaryOrder, fetchUserOrders } from "../../user/thunks";
import { handleAuthError } from "../../../utilities/authErrorHandler";

const addOrderData = createAsyncThunk(
  "order/addOrderData",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const adminDeviceToken = state.orderData.adminDeviceToken;
    const temporaryOrder = state.userData.temporaryOrder;
    const docRef = FIREBASE_COLLECTION_ORDERS;

    const fixedData = JSON.parse(JSON.stringify(temporaryOrder));

    delete fixedData.order_detail.id;
    delete fixedData.order_detail.showOnCatalog;
    delete fixedData.order_detail.createdAt;
    delete fixedData.cust_ingame_acc.key;

    fixedData.order_date = Timestamp.fromDate(new Date());
    fixedData.order_status = "Pending";

    try {
      const checkKey = query(docRef, orderBy("order_date", "desc"), limit(1));
      const querySnapshot = await getDocs(checkKey);

      let currentKeyNumber = 0;

      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[0];
        const lastKey = lastDoc.id;
        const lastKeyNumber = parseInt(lastKey.split("C")[1], 10);
        currentKeyNumber = lastKeyNumber;
      }

      const newKeyNumber = currentKeyNumber + 1;
      const newKey = `BC${newKeyNumber}`;
      const newDocRef = doc(docRef, newKey);

      await setDoc(newDocRef, fixedData);

      if (adminDeviceToken) {
        const notificateAdmin = adminDeviceToken.user_device_tokens.map(
          (token) => {
            return sendPushNotifications(token, {
              title: `Ada Order Baru`,
              body: `Order dengan kode ${newKey} telah masuk!`,
            });
          }
        );
        await Promise.all(notificateAdmin);
      }

      await dispatch(fetchAllOrderData());
      await dispatch(fetchUserOrders());

      await dispatch(clearTemporaryOrder());
    } catch (error) {
      return rejectWithValue({
        success: false,
        error_message: handleAuthError(error.code),
      });
    }
  }
);

export default addOrderData;
