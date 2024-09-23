import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_USER_DETAIL } from "../../../config";

import { collection, doc, getDocs } from "firebase/firestore";

const fetchUserIngameAccount = createAsyncThunk(
  "user/fetchUserIngameAccount",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const uid = state.auth.currentUser.uid;

    try {
      const docRef = doc(FIREBASE_COLLECTION_USER_DETAIL, uid);
      const userIngameAccountRef = collection(docRef, "ingame_account");

      const inGameAccountSnapshot = await getDocs(userIngameAccountRef);

      if (!inGameAccountSnapshot.empty) {
        return inGameAccountSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export default fetchUserIngameAccount;
