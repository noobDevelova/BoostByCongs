import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendEmailVerification } from "firebase/auth/cordova";
import { handleAuthError } from "../../../utilities/authErrorHandler";

const sendVerificationEmailToUser = createAsyncThunk(
  "auth/sendVerificationEmailToUser",
  async (currentUser, { rejectWithValue }) => {
    try {
      await sendEmailVerification(currentUser);
      return { success: true };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        error_message: handleAuthError(error),
      });
    }
  }
);

export default sendVerificationEmailToUser;
