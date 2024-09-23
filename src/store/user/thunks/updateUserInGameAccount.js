import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_USER_DETAIL } from "../../../config";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import fetchUserIngameAccount from "./fetchUserIngameAccount";

const updateUserInGameAccount = createAsyncThunk(
  "user/updateUserInGameAccount",
  async (updatedAcc, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const uid = state.auth.currentUser.uid;
    const docRef = doc(FIREBASE_COLLECTION_USER_DETAIL, uid);
    const userInGameAccountRef = collection(docRef, "ingame_account");
    const inGameAccountRef = doc(userInGameAccountRef, updatedAcc.id);

    delete updatedAcc.id;
    updatedAcc.updatedAt = Timestamp.fromDate(new Date());

    try {
      await setDoc(inGameAccountRef, updatedAcc);
      dispatch(fetchUserIngameAccount());
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export default updateUserInGameAccount;
