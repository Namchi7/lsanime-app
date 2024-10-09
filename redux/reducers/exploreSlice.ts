import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiCall from "@/utils/apiCall";
import { ExploreInitialDataType, ExploreResponseType } from "@/constants/types";

export const fetchExploreData = createAsyncThunk(
  "fetchExploreData",
  async (page: number) => {
    const recommendations: ExploreResponseType = await apiCall(
      "/recommendations/anime",
      `page=${page}`
    );

    return recommendations;
  }
);

const initialState: ExploreInitialDataType = {
  isLoading: true,
  data: null,
  isError: false,
};

const exploreSlice = createSlice({
  name: "exploreSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExploreData.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.isError = false;
    });
    builder.addCase(fetchExploreData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchExploreData.rejected, (state) => {
      state.isLoading = false;
      state.data = null;
      state.isError = true;
    });
  },
});

export default exploreSlice.reducer;
