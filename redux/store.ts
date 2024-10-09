import { configureStore } from "@reduxjs/toolkit";

import homePageReducer from "./reducers/homePageSlice";
import exploreReducer from "./reducers/exploreSlice";
import searchReducer from "./reducers/searchSlice";
import filterReducer from "./reducers/filterSlice";
import animeReducer from "./reducers/animeDetailsSlice";

export const store = configureStore({
  reducer: {
    homeTab: homePageReducer,
    exploreTab: exploreReducer,
    searchTab: searchReducer,
    filterTab: filterReducer,
    anime: animeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
