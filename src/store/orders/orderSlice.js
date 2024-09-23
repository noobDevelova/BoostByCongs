import { createSlice } from "@reduxjs/toolkit";
import {
  completeOrderData,
  confirmOrderData,
  fetchAdminDeviceToken,
  fetchAllOrderData,
} from "./thunks";

const initialState = {
  orderLoading: false,
  orderData: [],
  adminDeviceToken: null,
  orderError: null,
};

const orders = createSlice({
  name: "orderData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setLoadingState = (state) => {
      state.orderLoading = true;
      state.orderError = null;
    };

    const setErrorState = (action, state) => {
      state.orderLoading = false;
      state.orderError = action.payload;
    };

    builder
      .addCase(fetchAllOrderData.pending, setLoadingState)
      .addCase(fetchAllOrderData.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderData = action.payload;
        state.orderError = null;
      })
      .addCase(fetchAllOrderData.rejected, setErrorState)
      .addCase(confirmOrderData.pending, setLoadingState)
      .addCase(confirmOrderData.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderError = null;
      })
      .addCase(confirmOrderData.rejected, setErrorState)
      .addCase(completeOrderData.pending, setLoadingState)
      .addCase(completeOrderData.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderError = null;
      })
      .addCase(completeOrderData.rejected, setErrorState)
      .addCase(fetchAdminDeviceToken.pending, setLoadingState)
      .addCase(fetchAdminDeviceToken.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.adminDeviceToken = action.payload;
        state.orderError = null;
      })
      .addCase(fetchAdminDeviceToken.rejected, setErrorState);
  },
});

export default orders.reducer;
