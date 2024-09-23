import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUserOrders = createAsyncThunk(
  "user/fetchUserOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const uid = state.auth.currentUser.uid;
      const allOrders = state.orderData.orderData;
      const userOrderData = allOrders.filter((item) => item.cust_uid === uid);

      return userOrderData;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        message: error,
      });
    }
  }
);

export default fetchUserOrders;
