import { DataState } from "../store/data";

const getRecurringBills = (state: DataState) => {
  return Array.from(
    new Set(state.transactions.filter((transaction) => transaction.recurring))
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

export const selectFilteredTransactionsByCategory = (
  state: DataState,
  category: string
) => {
  return state.transactions
    .filter((transaction) => transaction.category === category)
    .slice(0, 3);
};

export const calculateTotalSpentInCategory = (
  state: DataState,
  category: string
) => {
  const filteredTransactions = selectFilteredTransactionsByCategory(
    state,
    category
  );

  return filteredTransactions
    .map((transaction) => Math.abs(transaction.amount))
    .reduce((sum, amount) => sum + amount, 0);
};
