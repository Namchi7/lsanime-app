import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "@/utils/apiCall";
import {
  HomePageDataType,
  HomePageInitialDataType,
  SeasonsResponseType,
} from "@/constants/types";

export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  const thisSeason: SeasonsResponseType = await apiCall(
    "/seasons/now",
    "limit=10"
  );
  const upcoming: SeasonsResponseType = await apiCall(
    "/seasons/upcoming",
    "limit=10"
  );
  const top: SeasonsResponseType = await apiCall("/top/anime", "limit=10");

  const previewData: HomePageDataType | null = {
    thisSeason,
    upcoming,
    top,
  };

  return previewData;
});

const initialState: HomePageInitialDataType = {
  isLoading: true,
  data: null,
  isError: false,
};

const homePageSlice = createSlice({
  name: "homePageSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeData.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.isError = false;
    });
    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchHomeData.rejected, (state) => {
      state.isLoading = false;
      state.data = null;
      state.isError = true;
    });
  },
});

export default homePageSlice.reducer;
