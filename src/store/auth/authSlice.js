import { createSlice } from "@reduxjs/toolkit";
import {
  signInUser,
  signUpUser,
  sendVerificationEmailToUser,
  updateCurrentEmail,
  signOutUser,
  isEmailExists,
  sendUserResetPassword,
} from "./thunks";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  authLoading: false,
};

const userAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = !!action.payload;
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    const setLoadingState = (state) => {
      state.authLoading = true;
      state.error = null;
    };

    const setErrorState = (state, action) => {
      state.authLoading = false;
      state.error = action.payload;
    };

    builder
      .addCase(signInUser.pending, setLoadingState)
      .addCase(signInUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(signInUser.rejected, setErrorState)
      .addCase(signUpUser.pending, setLoadingState)
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.authLoading = false;
        // state.isAuthenticated = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, setErrorState)
      .addCase(updateCurrentEmail.pending, setLoadingState)
      .addCase(updateCurrentEmail.fulfilled, (state) => {
        state.authLoading = false;
        state.error = null;
      })
      .addCase(updateCurrentEmail.rejected, setErrorState)
      .addCase(sendVerificationEmailToUser.pending, setLoadingState)
      .addCase(sendVerificationEmailToUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.error = null;
      })
      .addCase(sendVerificationEmailToUser.rejected, setErrorState)
      .addCase(signOutUser.pending, setLoadingState)
      .addCase(signOutUser.fulfilled, () => initialState)
      .addCase(signOutUser.rejected, setErrorState)
      .addCase(isEmailExists.pending, setLoadingState)
      .addCase(isEmailExists.fulfilled, (state, action) => {
        state.authLoading = false;
        state.registerData = action.payload;
        state.error = null;
      })
      .addCase(isEmailExists.rejected, setErrorState)
      .addCase(sendUserResetPassword.pending, setLoadingState)
      .addCase(sendUserResetPassword.fulfilled, (action, state) => {
        state.authLoading = false;
        state.error = null;
      })
      .addCase(sendUserResetPassword.rejected, setErrorState);
  },
});

export const { setUser, setLoading, setError } = userAuth.actions;
export default userAuth.reducer;
