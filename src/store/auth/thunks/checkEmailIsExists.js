import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_COLLECTION_USER_DETAIL } from "../../../config";
import { getDocs, query, where } from "firebase/firestore";

const isEmailExists = createAsyncThunk(
  "auth/isEmailExists",
  async (email, { rejectWithValue }) => {
    try {
      const querySnapshot = query(
        FIREBASE_COLLECTION_USER_DETAIL,
        where("email", "==", email)
      );
      const snapshot = await getDocs(querySnapshot);

      if (snapshot.empty) {
        return { isExists: false };
      } else {
        return { isExists: true };
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        message: "Terjadi Kesalahan",
      });
    }
  }
);

export default isEmailExists;
