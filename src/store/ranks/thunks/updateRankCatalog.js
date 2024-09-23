import { createAsyncThunk } from "@reduxjs/toolkit";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { FIREBASE_COLLECTION_RANK_CATALOG } from "../../../config";
import fetchRankCatalog from "./fetchRankCatalog";

const updateRankCatalog = createAsyncThunk(
  "rank/updateRankCatalog",
  async (updatedData, { rejectWithValue, dispatch }) => {
    const docRef = FIREBASE_COLLECTION_RANK_CATALOG;
    const dataRef = doc(docRef, updatedData.id);

    try {
      updatedData.updatedAt = Timestamp.fromDate(new Date());

      delete updatedData.id;

      await setDoc(dataRef, updatedData);
      dispatch(fetchRankCatalog());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export default updateRankCatalog;
