import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FIREBASE_AUTH,
  FIREBASE_COLLECTION_USER_DETAIL,
} from "../../../config";
import { handleAuthError } from "../../../utilities/authErrorHandler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { registerForPushNotificationsAsync } from "../../../utilities/registerPushNotifications";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const auth = FIREBASE_AUTH;

const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const device_token = await registerForPushNotificationsAsync();

      if (device_token) {
        // await setDoc(
        //   doc(FIREBASE_COLLECTION_USER_DETAIL, user.uid),
        //   { user_device_token: arrayUnion() },
        // );

        const userDocRef = doc(FIREBASE_COLLECTION_USER_DETAIL, user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          const existingTokens = data.user_device_tokens || [];

          if (!existingTokens.includes(device_token)) {
            await updateDoc(userDocRef, {
              user_device_tokens: arrayUnion(device_token),
            });

            console.log("Token berhasil disimpan");
          } else {
            console.log("Token sudah ada, tidak perlu disimpan");
          }
        } else {
          await setDoc(userDocRef, {
            user_device_tokens: [device_token],
          });

          console.log("Dokumen dibuat dan disimpan");
        }
      }

      return user;
    } catch (error) {
      return rejectWithValue({
        success: false,
        error_message: handleAuthError(error.code),
      });
    }
  }
);

export default signInUser;
