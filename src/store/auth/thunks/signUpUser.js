import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FIREBASE_AUTH,
  FIREBASE_COLLECTION_USER_DETAIL,
} from "../../../config";
import { handleAuthError } from "../../../utilities/authErrorHandler";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { registerForPushNotificationsAsync } from "../../../utilities/registerPushNotifications";

const auth = FIREBASE_AUTH;

const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (registeredData, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registeredData.email,
        registeredData.password
      );

      const device_token = await registerForPushNotificationsAsync();

      if (device_token) {
        const userDataReference = {
          email: registeredData.email,
          username: registeredData.username,
          role: "customer",
          phone_number: null,
          verified: auth.currentUser.emailVerified,
          user_device_tokens: [device_token],
        };

        const userReference = doc(
          FIREBASE_COLLECTION_USER_DETAIL,
          auth.currentUser.uid
        );

        await setDoc(userReference, userDataReference);

        return userCredential.user;
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        error_message: handleAuthError(error),
      });
    }
  }
);

export default signUpUser;
