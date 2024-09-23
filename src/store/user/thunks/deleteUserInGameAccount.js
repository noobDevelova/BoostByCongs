import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_USER_DETAIL } from "../../../config";

import { collection, deleteDoc, doc } from "firebase/firestore";

import fetchUserIngameAccount from "./fetchUserIngameAccount";

const deleteUserInGameAccount = createAsyncThunk(
  "user/deleteUserInGameAccount",
  async (accId, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const uid = state.auth.currentUser.uid;
    const docRef = doc(FIREBASE_COLLECTION_USER_DETAIL, uid);
    const userInGameAccountRef = collection(docRef, "ingame_account");
    const inGameAccountData = doc(userInGameAccountRef, accId);

    try {
      await deleteDoc(inGameAccountData);
      dispatch(fetchUserIngameAccount());
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export default deleteUserInGameAccount;
