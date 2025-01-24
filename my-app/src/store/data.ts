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

interface DataState {
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

const getRecurringBills = (state: DataState) => {
  return Array.from(
    new Set(
      state.transactions.filter((transaction) => transaction.recurring === true)
    )
  );
};

const calculateTransactionsRecurringBills = (
  state: DataState,
  dateRangeStart: number,
  dateRangeEnd: number
) => {
  const recurringTransactions = getRecurringBills(state);

  const filteredTransactions = recurringTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getDate() >= dateRangeStart &&
      transactionDate.getDate() <= dateRangeEnd
    );
  });

  const totalAmount = filteredTransactions.reduce(
    (total, transaction) => total + Math.abs(transaction.amount),
    0
  );

  return {
    count: filteredTransactions.length,
    totalAmount,
  };
};

export const getSummaryRecurringBillsData = (state: DataState) => {
  const paidBillsData = calculateTransactionsRecurringBills(state, 1, 4);
  const dueSoonData = calculateTransactionsRecurringBills(state, 5, 11);
  const totalUpcomingData = calculateTransactionsRecurringBills(state, 12, 31);

  return [
    {
      title: "Paid Bills",
      content: `${paidBillsData.count} ($${paidBillsData.totalAmount.toFixed(
        2
      )})`,
    },
    {
      title: "Total Upcoming",
      content: `${
        totalUpcomingData.count
      } ($${totalUpcomingData.totalAmount.toFixed(2)})`,
    },
    {
      title: "Due Soon",
      content: `${dueSoonData.count} ($${dueSoonData.totalAmount.toFixed(2)})`,
    },
  ];
};

export const { loadData, loadDataSuccess, loadDataError } = dataSlice.actions;
export default dataSlice.reducer;
