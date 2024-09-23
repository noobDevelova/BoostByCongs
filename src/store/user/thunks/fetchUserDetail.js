import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_USER_DETAIL } from "../../../config";

import { doc, getDoc } from "firebase/firestore";

const fetchUserDetail = createAsyncThunk(
  "user/fetchUserDetail",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const uid = state.auth.currentUser.uid;

    try {
      const userDoc = doc(FIREBASE_COLLECTION_USER_DETAIL, uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        return userSnapshot.data();
      } else {
        throw new Error("User Not Found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default fetchUserDetail;
