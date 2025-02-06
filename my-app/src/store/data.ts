import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../data/data.json";

interface Balance {
  current: number;
  income: number;
  expenses: number;
}

interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface DataState {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: DataState = {
  balance: data.balance,
  transactions: data.transactions,
  budgets: data.budgets,
  pots: data.pots,
  isLoading: false,
  isError: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    loadData(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loadDataSuccess(
      state,
      action: PayloadAction<{
        balance: Balance;
        transactions: Transaction[];
        budgets: Budget[];
        pots: Pot[];
      }>
    ) {
      state.isLoading = false;
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
      state.budgets = action.payload.budgets;
      state.pots = action.payload.pots;
    },
    loadDataError(state) {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { loadData, loadDataSuccess, loadDataError } = dataSlice.actions;
export default dataSlice.reducer;
