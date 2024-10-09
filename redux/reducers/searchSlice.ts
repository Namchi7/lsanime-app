import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "@/utils/apiCall";
import { AnimeSearchResponseType } from "@/constants/types";

export interface InitialStateType {
  isLoading: boolean;
  data: AnimeSearchResponseType | null;
  isError: boolean;
}

export const fetchSearchWithQuery = createAsyncThunk(
  "fetchSearchWithQuery",
  async ({ query, page }: { query: string; page: number }) => {
    const res: AnimeSearchResponseType | null = await apiCall(
      "/anime",
      `q=${query}&page=${page}&limit=20`
    );

    return res;
  }
);

const initialState: InitialStateType = {
  isLoading: false,
  data: null,
  isError: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchWithQuery.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.isError = false;
    });
    builder.addCase(fetchSearchWithQuery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchSearchWithQuery.rejected, (state) => {
      state.isLoading = false;
      state.data = null;
      state.isError = true;
    });
  },
});

export default searchSlice.reducer;
