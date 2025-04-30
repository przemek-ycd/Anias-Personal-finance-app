import React, { FC } from "react";
import {
  StyledWrapperTransactionsDetails,
  TransactionsNameWrapper,
  TransactionsAdditionalInfoWrapper,
} from "./TransactionTable.styles";

interface Transaction {
  name: string;
  avatar: string;
  amount: number;
  date: string;
}

interface TransactionTableProps {
  filteredTransactions: Transaction[];
}

export const TransactionTable: FC<TransactionTableProps> = ({
  filteredTransactions,
}) => {
  const formatTransactionAmount = (amount) => {
    return amount > 0 ? `+$${amount}` : `-$${Math.abs(amount)}`;
  };

  const formatTransactionDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");
  };

  return (
    <>
      {filteredTransactions.map((transaction) => (
        <StyledWrapperTransactionsDetails
          key={`${transaction.name}-${transaction.date}-${transaction.amount}`}
        >
          <TransactionsNameWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/${transaction.avatar}`}
              alt={transaction.name}
            />
            <p>{transaction.name}</p>
          </TransactionsNameWrapper>
          <TransactionsAdditionalInfoWrapper>
            <p
              style={{
                color: transaction.amount < 0 ? "black" : "rgb(39, 124, 120)",
              }}
            >
              {formatTransactionAmount(transaction.amount)}
            </p>
            <p>{formatTransactionDate(transaction.date)}</p>
          </TransactionsAdditionalInfoWrapper>
        </StyledWrapperTransactionsDetails>
      ))}
    </>
  );
};
