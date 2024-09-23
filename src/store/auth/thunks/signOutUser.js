import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_AUTH } from "../../../config";
import { signOut } from "firebase/auth";
import { handleAuthError } from "../../../utilities/authErrorHandler";

const auth = FIREBASE_AUTH;

const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue({
        success: false,
        error_message: handleAuthError(error),
      });
    }
  }
);

export default signOutUser;
