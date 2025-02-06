import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data.ts";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export const dataState = (state: RootState) => state.data;
export default store;
