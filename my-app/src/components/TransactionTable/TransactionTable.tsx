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
  return (
    <>
      {filteredTransactions.map((transaction) => (
        <StyledWrapperTransactionsDetails key={transaction.name}>
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
              {transaction.amount > 0
                ? `+$${transaction.amount}`
                : `-$${Math.abs(transaction.amount)}`}
            </p>
            <p>
              {new Date(transaction.date)
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")}
            </p>
          </TransactionsAdditionalInfoWrapper>
        </StyledWrapperTransactionsDetails>
      ))}
    </>
  );
};
