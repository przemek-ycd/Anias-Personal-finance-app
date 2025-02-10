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
import { selectUniqueCategoriesTransactions } from "../../utils/transactionsUtils.ts";
import { SelectSortBy } from "../SelectSortBy/SelectSortBy.tsx";
import { InputSearch } from "../InputSearch/InputSearch.tsx";

interface TransactionsProps {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

const sortFunctions = {
  All: (transactions: TransactionsProps[]) => transactions,
  Highest: (transactions: TransactionsProps[]) =>
    [...transactions].sort((a, b) => b.amount - a.amount),
  Lowest: (transactions: TransactionsProps[]) =>
    [...transactions].sort((a, b) => a.amount - b.amount),
  Oldest: (transactions: TransactionsProps[]) =>
    [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
  Latest: (transactions: TransactionsProps[]) =>
    [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  "A to Z": (transactions: TransactionsProps[]) =>
    [...transactions].sort((a, b) => a.name.localeCompare(b.name)),
  "Z to A": (transactions: TransactionsProps[]) =>
    [...transactions].sort((a, b) => b.name.localeCompare(a.name)),
};

export const Transactions: FC = () => {
  const { transactions } = useSelector((state: RootState) => state.data);
  const categoriesTransactions = useSelector((state: RootState) =>
    selectUniqueCategoriesTransactions(state.data)
  );

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  const sortedTransactions = sortFunctions[selectedSort](filteredBySearch);

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
          <div>
            <InputSearch searchTerm={searchTerm} onChange={setSearchTerm} />
          </div>
          <div>
            <SelectSortBy
              label="Category"
              selectOptions={["All", ...categoriesTransactions]}
              onChange={setSelectedCategory}
            />
            <SelectSortBy
              label="Sort by"
              selectOptions={Object.keys(sortFunctions)}
              onChange={setSelectedSort}
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
                        : `$${Math.abs(transaction.amount)}`}
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
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
