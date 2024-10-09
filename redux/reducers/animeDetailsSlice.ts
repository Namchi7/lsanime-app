import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "@/utils/apiCall";
import {
  AnimeDetailsInitialDataType,
  AnimeDetailsResponseType,
} from "./../../constants/types";

export const fetchAnimeById = createAsyncThunk(
  "fetchAnimeById",
  async (id: number) => {
    const animeDetails: AnimeDetailsResponseType = await apiCall(
      `/anime/${id}`,
      ""
    );

    return animeDetails;
  }
);

const initialState: AnimeDetailsInitialDataType = {
  isLoading: true,
  data: null,
  isError: false,
};

const animeDetailsSlice = createSlice({
  name: "animeDetailsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnimeById.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.isError = false;
    });
    builder.addCase(fetchAnimeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.isError = false;
    });
    builder.addCase(fetchAnimeById.rejected, (state) => {
      state.isLoading = false;
      state.data = null;
      state.isError = true;
    });
  },
});

export default animeDetailsSlice.reducer;
