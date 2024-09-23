import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";
import { FIREBASE_COLLECTION_RANK_CATALOG } from "../../../config";

const fetchRankCatalog = createAsyncThunk(
  "rank/fetchRankCatalog",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(FIREBASE_COLLECTION_RANK_CATALOG);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default fetchRankCatalog;
