import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_USER_DETAIL } from "../../../config";

import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import fetchUserIngameAccount from "./fetchUserIngameAccount";

const uploadUserInGameAccount = createAsyncThunk(
  "user/uploadUserInGameAccount",
  async (inGameData, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const uid = state.auth.currentUser.uid;
    const docRef = doc(FIREBASE_COLLECTION_USER_DETAIL, uid);
    const userIngameAccountRef = collection(docRef, "ingame_account");

    inGameData.createdAt = Timestamp.fromDate(new Date());
    inGameData.isBoosted = false;

    try {
      const checkKey = query(
        userIngameAccountRef,
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(checkKey);

      let currentKeyNumber = 0;

      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[0];
        const lastKey = lastDoc.id;
        const lastKeyNumber = parseInt(lastKey.split("A")[1], 10);

        currentKeyNumber = lastKeyNumber;
      }

      const newKeyNumber = currentKeyNumber + 1;
      const newKey = `IGA${newKeyNumber}`;

      const newDocRef = doc(userIngameAccountRef, newKey);

      await setDoc(newDocRef, inGameData);

      await dispatch(fetchUserIngameAccount());
    } catch (error) {
      console.log(error);
      console.log(uid);
      return rejectWithValue(error.message);
    }
  }
);

export default uploadUserInGameAccount;
