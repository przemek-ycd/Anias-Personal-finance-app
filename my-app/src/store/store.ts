import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data.ts";
import newsReducer from "./news.ts";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    data: dataReducer,
    news: newsReducer,
  },
});

export const dataState = (state: RootState) => state.data;
export const newsState = (state: RootState) => state.news;
export type AppDispatch = typeof store.dispatch;
export default store;
