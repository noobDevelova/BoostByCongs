import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveTemporaryOrder = createAsyncThunk(
  "user/saveTemporaryOrder",
  async (orderData, { getState }) => {
    const state = getState();
    const { userData } = state; // Akses userData
    const { temporaryOrder } = userData;

    try {
      const updatedOrder = { ...temporaryOrder, ...orderData };
      console.log("Saving to AsyncStorage:", updatedOrder);

      return updatedOrder;
    } catch (error) {
      console.log("error saving", error);
    }
  }
);

export const updateTemporaryOrder = createAsyncThunk(
  "user/updateTemporaryOrder",
  async (updatedData, { getState }) => {
    const state = getState();
    const { userData } = state;
    const { temporaryOrder } = userData;

    try {
      // Gabungkan data secara hati-hati
      const updatedOrderDetail = {
        ...temporaryOrder.order_detail,
        ...updatedData.order_detail,
        request_hero:
          updatedData.order_detail?.request_hero ||
          temporaryOrder.order_detail?.request_hero ||
          [],
      };

      const updatedOrder = {
        ...temporaryOrder,
        ...updatedData,
        order_detail: updatedOrderDetail,
      };

      return updatedOrder;
    } catch (error) {
      console.log("error updating", error);
      throw error;
    }
  }
);

export const clearTemporaryOrder = createAsyncThunk(
  "user/clearTemporaryOrder",
  async () => {
    await AsyncStorage.removeItem("temporaryOrder");
    return {};
  }
);
