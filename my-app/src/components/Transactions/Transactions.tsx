import React, { FC, useState, useMemo } from "react";
import {
  StyledWrapper,
  SectionHeader,
  StyledWrapperDetails,
  StyledWrapperDetailsHeader,
  ImageWrapper,
  StyledTableCell,
} from "./Transactions.styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  selectUniqueCategoriesTransactions,
  sortMethods,
} from "../../utils/transactionsUtils.ts";
import { SelectDropdown } from "../SelectDropdown/SelectDropdown.tsx";
import { InputSearch } from "../InputSearch/InputSearch.tsx";

interface TransactionsProps {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

type SortOption =
  | "All"
  | "Highest"
  | "Lowest"
  | "Oldest"
  | "Latest"
  | "A to Z"
  | "Z to A";

const sortMethodsForDateOrder = {
  oldest: (transactions: TransactionsProps[]) =>
    [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
  latest: (transactions: TransactionsProps[]) =>
    [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
};

const combinedSortMethods = {
  ...sortMethods,
  ...sortMethodsForDateOrder,
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

export const Transactions: FC = () => {
  const { transactions } = useSelector((state: RootState) => state.data);
  const categoriesTransactions = useSelector((state: RootState) =>
    selectUniqueCategoriesTransactions(state.data)
  );
  type CategoryOption = "All" | (typeof categoriesTransactions)[number];

  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<SortOption>("All");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption>("All");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const itemsFrom = page * rowsPerPage;
  const itemsTo = itemsFrom + rowsPerPage;

  const tableHeaders = ["Recipient", "Category", "Transaction Date", "Amount"];

  const filteredByCategory = useMemo(() => {
    return selectedCategory === "All"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.category === selectedCategory
        );
  }, [transactions, selectedCategory]);

  const filteredBySearch = filteredByCategory.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = useMemo(() => {
    if (selectedSort.toLowerCase() === "all") {
      return filteredBySearch;
    }
    return combinedSortMethods[selectedSort.toLowerCase()](filteredBySearch);
  }, [selectedSort, filteredBySearch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <StyledWrapper>
      <SectionHeader>
        <h1>Transactions</h1>
      </SectionHeader>
      <StyledWrapperDetails>
        <StyledWrapperDetailsHeader>
          <InputSearch searchTerm={searchTerm} onChange={setSearchTerm} />
          <div>
            <SelectDropdown
              label="Category"
              selectOptions={["All", ...categoriesTransactions]}
              onChange={setSelectedCategory}
            />
            <SelectDropdown
              label="Sort by"
              selectOptions={Object.values(sortLabels)}
              onChange={(value) => setSelectedSort(value as SortOption)}
            />
            <SelectDropdown
              label="Rows per page"
              selectOptions={["10", "20", "50"]}
              onChange={(value) => setRowsPerPage(Number(value))}
            />
          </div>
        </StyledWrapperDetailsHeader>
        <TableContainer>
          <Table>
            <TableHead>
              {tableHeaders.map((header, index) => (
                <StyledTableCell key={index}>{header}</StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              {sortedTransactions
                .slice(itemsFrom, itemsTo)
                .map((transaction) => (
                  <TableRow key={transaction.name}>
                    <TableCell>
                      <ImageWrapper>
                        <img
                          src={`${process.env.PUBLIC_URL}/${transaction.avatar}`}
                          alt={transaction.name}
                        />
                        <p>{transaction.name}</p>
                      </ImageWrapper>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      {new Date(transaction.date)
                        .toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(",", "")}
                    </TableCell>
                    <StyledTableCell isNegative={transaction.amount < 0}>
                      {transaction.amount > 0
                        ? `$${transaction.amount}`
                        : `-$${Math.abs(transaction.amount)}`}
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </StyledWrapperDetails>
    </StyledWrapper>
  );
};

export default Transactions;
