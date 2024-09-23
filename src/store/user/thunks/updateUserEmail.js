import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FIREBASE_COLLECTION_USER_DETAIL,
  FIREBASE_AUTH,
} from "../../../config";
import { doc, updateDoc } from "firebase/firestore";
import fetchUserDetail from "./fetchUserDetail";

const updateUserEmail = createAsyncThunk(
  "user/updateUserEmail",
  async (newEmail, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const uid = state.auth.currentUser.uid;
    const userDocRef = doc(FIREBASE_COLLECTION_USER_DETAIL, uid);
    try {
      await updateDoc(userDocRef, {
        email: newEmail,
        verified: FIREBASE_AUTH.currentUser.emailVerified,
      });
      dispatch(fetchUserDetail());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export default updateUserEmail;
