import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_AUTH } from "../../../config";
import {
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { updateUserEmail } from "../../user/thunks";
import { handleAuthError } from "../../../utilities/authErrorHandler";

const auth = FIREBASE_AUTH;

const updateCurrentEmail = createAsyncThunk(
  "auth/updateEmail",
  async ({ newEmail, password }, { dispatch, rejectWithValue }) => {
    const currentEmail = auth.currentUser.email;
    try {
      const userCredential = EmailAuthProvider.credential(
        currentEmail,
        password
      );
      await reauthenticateWithCredential(auth.currentUser, userCredential);
      await updateEmail(auth.currentUser, newEmail);
      dispatch(updateUserEmail(newEmail));
    } catch (error) {
      console.log(handleAuthError(error));
      return rejectWithValue({
        success: false,
        error_message: handleAuthError(error.code),
      });
    }
  }
);

export default updateCurrentEmail;
