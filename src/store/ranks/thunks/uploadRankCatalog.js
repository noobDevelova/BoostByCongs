import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Timestamp,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_COLLECTION_RANK_CATALOG } from "../../../config";
import fetchRankCatalog from "./fetchRankCatalog";

const uploadRankCatalog = createAsyncThunk(
  "rank/uploadRankCatalog",
  async (rankData, { rejectWithValue, dispatch }) => {
    const docRef = FIREBASE_COLLECTION_RANK_CATALOG;

    rankData.createdAt = Timestamp.fromDate(new Date());

    try {
      const checkKey = query(docRef, orderBy("createdAt", "desc"), limit(1));
      const querySnapshot = await getDocs(checkKey);

      let currentKeyNumber = 0;

      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[0];
        const lastKey = lastDoc.id;
        const lastKeyNumber = parseInt(lastKey.split("K")[1], 10);
        currentKeyNumber = lastKeyNumber;
      }

      const newKeyNumber = currentKeyNumber + 1;
      const newKey = `RNK${newKeyNumber}`;

      const newDocRef = doc(docRef, newKey);

      await setDoc(newDocRef, rankData);

      await dispatch(fetchRankCatalog());
    } catch (error) {
      console.error(error);
      console.error("memek");
      console.log(rankData);

      return rejectWithValue(error.message);
    }
  }
);

export default uploadRankCatalog;
