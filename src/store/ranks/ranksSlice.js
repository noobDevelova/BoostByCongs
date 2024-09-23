import { createSlice } from "@reduxjs/toolkit";

import {
  fetchRankCatalog,
  uploadRankCatalog,
  updateRankCatalog,
  deleteRankCatalog,
} from "./thunks";

const initialState = {
  rankLoading: false,
  rankData: [],
  rankError: null,
};

const ranksCatalog = createSlice({
  name: "rankData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setLoadingState = (state) => {
      state.rankLoading = true;
      state.rankError = null;
    };
    const setErrorState = (state, action) => {
      state.rankLoading = false;
      state.rankError = action.payload;
    };

    builder
      .addCase(fetchRankCatalog.pending, setLoadingState)
      .addCase(fetchRankCatalog.fulfilled, (state, action) => {
        state.rankLoading = false;
        state.rankData = action.payload;
        state.rankError = null;
      })
      .addCase(fetchRankCatalog.rejected, setErrorState)

      .addCase(uploadRankCatalog.pending, setLoadingState)
      .addCase(uploadRankCatalog.fulfilled, (state, action) => {
        state.rankLoading = false;
        state.rankError = null;
      })
      .addCase(uploadRankCatalog.rejected, setErrorState)

      .addCase(updateRankCatalog.pending, setLoadingState)
      .addCase(updateRankCatalog.fulfilled, (state, action) => {
        state.rankLoading = false;
        state.rankError = null;
      })
      .addCase(updateRankCatalog.rejected, setErrorState)

      .addCase(deleteRankCatalog.pending, setLoadingState)
      .addCase(deleteRankCatalog.fulfilled, (state, action) => {
        state.rankLoading = false;
        state.rankData = state.rankData.filter(
          (rank) => rank.id !== action.payload
        );
        state.rankError = null;
      })
      .addCase(deleteRankCatalog.rejected, setErrorState);
  },
});

export default ranksCatalog.reducer;
