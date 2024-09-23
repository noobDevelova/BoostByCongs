import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_USER_DETAIL } from "../../../config";
import { handleAuthError } from "../../../utilities/authErrorHandler";
import { getDocs, query, where } from "firebase/firestore";

const fetchAdminDeviceToken = createAsyncThunk(
  "order/fetchAdminDeviceToken",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = query(
        FIREBASE_COLLECTION_USER_DETAIL,
        where("role", "==", "admin")
      );

      const snapshot = await getDocs(querySnapshot);

      const userDeviceToken = snapshot.docs.map((doc) => ({
        user_device_tokens: doc.data().user_device_tokens,
      }));

      return userDeviceToken[0];
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        error_message: handleAuthError(error.code),
      });
    }
  }
);

export default fetchAdminDeviceToken;
