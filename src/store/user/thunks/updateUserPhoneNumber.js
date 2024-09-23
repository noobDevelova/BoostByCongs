import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_COLLECTION_USER_DETAIL } from "../../../config";
import fetchUserDetail from "./fetchUserDetail";
import { handleAuthError } from "../../../utilities/authErrorHandler";

const updateUserPhoneNumber = createAsyncThunk(
  "user/updateUserPhoneNumber",
  async (phoneNumber, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const uid = state.auth.currentUser.uid;
    const userDocRef = doc(FIREBASE_COLLECTION_USER_DETAIL, uid);

    try {
      await updateDoc(userDocRef, {
        phone_number: phoneNumber,
      });

      dispatch(fetchUserDetail());
    } catch (error) {
      return rejectWithValue({
        success: false,
        error_message: handleAuthError(error.code),
      });
    }
  }
);

export default updateUserPhoneNumber;
