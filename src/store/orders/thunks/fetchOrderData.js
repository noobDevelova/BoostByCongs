import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_ORDERS } from "../../../config";
import { getDocs } from "firebase/firestore";

const fetchAllOrderData = createAsyncThunk(
  "order/fetchOrderData",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(FIREBASE_COLLECTION_ORDERS);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export default fetchAllOrderData;
