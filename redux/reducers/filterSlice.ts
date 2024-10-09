import { AnimeFilterResponseType, filtersType } from "@/constants/types";
import apiCall from "@/utils/apiCall";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface InitialStateType {
  isLoading: boolean;
  data: AnimeFilterResponseType | null;
  isError: boolean;
}

const filtersKeyToParams = {
  startDate: "start_date",
  endDate: "end_date",
  status: "status",
  rating: "rating",
  minScore: "min_score",
  type: "type",
  orderBy: "order_by",
  sortBy: "sort_by",
};

const initialFilters: filtersType = {
  type: "",
  rating: "",
  startDate: null,
  endDate: null,
  minScore: 0,
  status: "",
  orderBy: "",
  sortBy: "",
  genres: [],
  page: 1,
};

export const fetchFilteredData = createAsyncThunk(
  "fetchFilteredData",
  async (filters: filtersType) => {
    let filterStr: string = "";
    Object.keys(filters).forEach((item) => {
      if (
        item !== "genres" &&
        item !== "page" &&
        filters[item as keyof typeof filters] !==
          initialFilters[item as keyof typeof initialFilters]
      ) {
        filterStr += `&${
          filtersKeyToParams[item as keyof typeof filtersKeyToParams]
        }=${filters[item as keyof typeof filters]}`;
      }
    });

    if (`${filters.genres}` !== `${initialFilters.genres}`) {
      filterStr += `&genres=${filters.genres}`;
    }

    const res: AnimeFilterResponseType = await apiCall(
      "/anime",
      `page=${filters.page}${filterStr}&limit=24`
    );

    return res;
  }
);

const initialState: InitialStateType = {
  isLoading: false,
  data: null,
  isError: false,
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredData.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.isError = false;
    });
    builder.addCase(fetchFilteredData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchFilteredData.rejected, (state) => {
      state.isLoading = false;
      state.data = null;
      state.isError = true;
    });
  },
});

export default filterSlice.reducer;
