import { createAsyncThunk } from "@reduxjs/toolkit";

const resetUserState = createAsyncThunk("user/resetUserState", async () => {
  return {};
});

export default resetUserState;
