import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_HEROES } from "../../../config";
import { getDocs } from "firebase/firestore";

const fetchHeroesData = createAsyncThunk(
  "heroes/fetchHeroesData",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(FIREBASE_COLLECTION_HEROES);
      const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default fetchHeroesData;
