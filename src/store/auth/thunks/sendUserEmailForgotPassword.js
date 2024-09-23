import { createAsyncThunk } from "@reduxjs/toolkit";
import isEmailExists from "./checkEmailIsExists";
import { FIREBASE_AUTH } from "../../../config";
import { sendPasswordResetEmail } from "firebase/auth";

const sendUserResetPassword = createAsyncThunk(
  "auth/sendUserResetEmailPasword",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      const emailExists = dispatch(isEmailExists(email));

      if (emailExists) {
        await sendPasswordResetEmail(FIREBASE_AUTH, email);
      } else {
        return { success: false, message: "Email tidak ditemukan" };
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        message: "Terjadi kesalahan saat reset password",
      });
    }
  }
);

export default sendUserResetPassword;
