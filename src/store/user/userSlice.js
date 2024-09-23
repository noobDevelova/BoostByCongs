import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchUserDetail,
  fetchUserIngameAccount,
  uploadUserInGameAccount,
  updateUserInGameAccount,
  updateUserEmail,
  deleteUserInGameAccount,
  resetUserState,
  saveTemporaryOrder,
  updateTemporaryOrder,
  clearTemporaryOrder,
  updateUserPhoneNumber,
  fetchUserOrders,
} from "./thunks";

const initialState = {
  userLoading: false,
  userDetail: null,
  userIngameAccount: [],
  temporaryOrder: {},
  userOrders: [],
  userError: null,
};

const userDetailSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setLoadingState = (state) => {
      state.userLoading = true;
      state.userError = null;
    };

    const setErrorState = (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    };

    builder
      .addCase(fetchUserDetail.pending, setLoadingState)
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userDetail = action.payload;
        state.userError = null;
      })
      .addCase(fetchUserDetail.rejected, setErrorState)
      .addCase(fetchUserIngameAccount.pending, setLoadingState)
      .addCase(fetchUserIngameAccount.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userIngameAccount = action.payload;
        state.userError = null;
      })
      .addCase(fetchUserIngameAccount.rejected, setErrorState)
      .addCase(uploadUserInGameAccount.pending, setLoadingState)
      .addCase(uploadUserInGameAccount.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = null;
      })
      .addCase(uploadUserInGameAccount.rejected, setErrorState)
      .addCase(deleteUserInGameAccount.pending, setLoadingState)
      .addCase(deleteUserInGameAccount.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userIngameAccount = state.userIngameAccount.filter(
          (account) => account.id !== action.payload
        );
      })
      .addCase(deleteUserInGameAccount.rejected, setErrorState)
      .addCase(updateUserInGameAccount.pending, setLoadingState)
      .addCase(updateUserInGameAccount.fulfilled, (action, state) => {
        state.userLoading = false;
        state.userError = null;
      })
      .addCase(updateUserInGameAccount.rejected, setErrorState)
      .addCase(updateUserEmail.pending, setLoadingState)
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = null;
      })
      .addCase(updateUserPhoneNumber.pending, setLoadingState)
      .addCase(updateUserPhoneNumber.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = null;
      })
      .addCase(updateUserPhoneNumber.rejected, setErrorState)
      .addCase(fetchUserOrders.pending, setLoadingState)
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userOrders = action.payload;
        state.userError = null;
      })
      .addCase(fetchUserOrders.rejected, setErrorState)
      .addCase(resetUserState.fulfilled, (state) => {
        state.userDetail = null;
        state.userIngameAccount = [];
        state.userError = null;
      })
      .addCase(saveTemporaryOrder.fulfilled, (state, action) => {
        state.temporaryOrder = action.payload;
      })
      .addCase(updateTemporaryOrder.fulfilled, (state, action) => {
        state.temporaryOrder = action.payload;
      })
      .addCase(clearTemporaryOrder.fulfilled, (state) => {
        state.temporaryOrder = {};
      });
  },
});

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["temporaryOrder"],
};

const userPersistedReducer = persistReducer(
  persistConfig,
  userDetailSlice.reducer
);

export default userPersistedReducer;
