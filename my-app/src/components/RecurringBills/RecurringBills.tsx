import React, { FC, useState, useMemo } from "react";
import {
  StyledWrapper,
  SectionHeader,
  StyledWrapperDetails,
  StyledWrapperDetailsHeader,
  TotalBills,
  SummaryBills,
  StyledSummaryBillsItem,
  BillsWrapper,
  WrapperImage,
  IconBill,
} from "./RecurringBills.styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  getRecurringBills,
  getSummaryRecurringBillsData,
} from "../../utils/transactionsUtils.ts";
import { SelectDropdown } from "../SelectDropdown/SelectDropdown.tsx";
import { InputSearch } from "../InputSearch/InputSearch.tsx";

type SortOption =
  | "All"
  | "Highest"
  | "Lowest"
  | "Oldest"
  | "Latest"
  | "A to Z"
  | "Z to A";

const tableHeaders = ["Bill Title", "Due Date", "Amount"];

const sortByDayOfMonth = (transactions: any[]) =>
  [...transactions].sort((a, b) => {
    const dayA = new Date(a.date).getDate();
    const dayB = new Date(b.date).getDate();
    return dayA - dayB;
  });

interface TransactionsProps {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

const sortMethods = {
  all: (transactions: TransactionsProps[]) => transactions,
  highest: (transactions: TransactionsProps[]) =>
    [...transactions].sort((a, b) => b.amount - a.amount),
  lowest: (transactions: TransactionsProps[]) =>
    [...transactions].sort((a, b) => a.amount - b.amount),
  oldest: (transactions: TransactionsProps[]) => sortByDayOfMonth(transactions),
  latest: (transactions: TransactionsProps[]) =>
    sortByDayOfMonth(transactions).reverse(),
  aToZ: (transactions: TransactionsProps[]) =>
    [...transactions].sort((a, b) => a.name.localeCompare(b.name)),
  zToA: (transactions: TransactionsProps[]) =>
    [...transactions].sort((a, b) => b.name.localeCompare(a.name)),
};

const sortLabels = {
  All: "All",
  Highest: "Highest",
  Lowest: "Lowest",
  Oldest: "Oldest",
  Latest: "Latest",
  aToZ: "A to Z",
  zToA: "Z to A",
};

const ordinalSuffixes = {
  1: "st",
  2: "nd",
  3: "rd",
  default: "th",
};

function getOrdinalSuffix(day) {
  const j = day % 10,
    k = day % 100;
  if (j === 1 && k !== 11) return ordinalSuffixes[1];
  if (j === 2 && k !== 12) return ordinalSuffixes[2];
  if (j === 3 && k !== 13) return ordinalSuffixes[3];
  return ordinalSuffixes.default;
}

const billIcons = {
  due: (
    <IconBill
      src={`${process.env.PUBLIC_URL}/images/icon-bill-due.svg`}
      alt="Icon bill due"
    />
  ),
  paid: (
    <IconBill
      src={`${process.env.PUBLIC_URL}/images/icon-bill-paid.svg`}
      alt="Icon bill paid"
    />
  ),
};

const SummaryBillsItem: FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  return (
    <StyledSummaryBillsItem>
      <p>{title}</p>
      <p>{content}</p>
    </StyledSummaryBillsItem>
  );
};

export const RecurringBills: FC = () => {
  const tableTransactions = useSelector((state: RootState) =>
    getRecurringBills(state.data)
  );

  const summaryItems = useSelector((state: RootState) =>
    getSummaryRecurringBillsData(state.data)
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<SortOption>("All");

  const filteredTransactions = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return tableTransactions.filter(
      (transaction) =>
        transaction.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        transaction.date.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, tableTransactions]);

  const sortedTransactions = useMemo(() => {
    return sortMethods[selectedSort.toLowerCase()](filteredTransactions);
  }, [selectedSort, filteredTransactions]);

  const totalBillsAmount = tableTransactions.reduce(
    (total, transaction) => total + Math.abs(transaction.amount),
    0
  );

  return (
    <StyledWrapper>
      <SectionHeader>
        <h1>Recurring Bills</h1>
      </SectionHeader>
      <StyledWrapperDetails>
        <StyledWrapperDetailsHeader>
          <TotalBills>
            <img
              src={`${process.env.PUBLIC_URL}/images/icon-recurring-bills.svg`}
              alt="Icon recurring bills"
            />
            <p>Total bills</p>
            <p>${totalBillsAmount}</p>
          </TotalBills>
          <SummaryBills>
            <h3>Summary</h3>
            {summaryItems.map((item) => (
              <SummaryBillsItem
                key={`${item.title}-${item.content}`}
                title={item.title}
                content={item.content}
              />
            ))}
          </SummaryBills>
        </StyledWrapperDetailsHeader>
        <BillsWrapper>
          <div>
            <InputSearch
              searchTerm={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
            <SelectDropdown
              label="Sort by"
              selectOptions={Object.values(sortLabels)}
              onChange={(value) => setSelectedSort(value as SortOption)}
            />
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                {tableHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableHead>
              <TableBody>
                {sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.name}>
                    <TableCell>
                      <WrapperImage>
                        <img
                          src={`${process.env.PUBLIC_URL}/${transaction.avatar}`}
                          alt={transaction.name}
                        />
                        <p>{transaction.name}</p>
                      </WrapperImage>
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date)
                        .toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                        })
                        .replace(
                          /^(\w+)\s(\d+)$/,
                          (_, month, day) =>
                            `Monthly - ${day}${getOrdinalSuffix(day)}`
                        )}
                      {(() => {
                        const day = new Date(transaction.date).getDate();
                        if (day >= 5 && day <= 11) {
                          return billIcons.due;
                        } else if (day >= 1 && day <= 4) {
                          return billIcons.paid;
                        }
                      })()}
                    </TableCell>
                    <TableCell>
                      {transaction.amount > 0
                        ? `$${transaction.amount}`
                        : `$${Math.abs(transaction.amount)}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BillsWrapper>
      </StyledWrapperDetails>
    </StyledWrapper>
  );
};

export default RecurringBills;
