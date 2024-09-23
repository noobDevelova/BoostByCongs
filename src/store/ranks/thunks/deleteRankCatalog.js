import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_COLLECTION_RANK_CATALOG } from "../../../config";
import fetchRankCatalog from "./fetchRankCatalog";

const deleteRankCatalog = createAsyncThunk(
  "rank/deleteRankCatalog",
  async (id, { rejectWithValue, dispatch }) => {
    const docRef = FIREBASE_COLLECTION_RANK_CATALOG;
    const dataRef = doc(docRef, id);
    try {
      await deleteDoc(dataRef);
      dispatch(fetchRankCatalog());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export default deleteRankCatalog;
