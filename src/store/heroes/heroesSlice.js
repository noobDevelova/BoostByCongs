import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroesData } from "./thunks";

const initialState = {
  heroesLoading: false,
  heroesItems: [],
  heroesError: null,
};

const heroSlice = createSlice({
  name: "heroes_data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setLoadingState = (state, action) => {
      state.heroesLoading = true;
      state.heroesError = null;
    };

    const setErrorState = (state, action) => {
      state.heroesLoading = false;
      state.heroesError = action.payload;
    };
    builder
      .addCase(fetchHeroesData.pending, setLoadingState)
      .addCase(fetchHeroesData.fulfilled, (state, action) => {
        state.heroesLoading = false;
        state.heroesItems = action.payload;
        state.heroesError = null;
      })
      .addCase(fetchHeroesData.rejected, setErrorState);
  },
});

export default heroSlice.reducer;
