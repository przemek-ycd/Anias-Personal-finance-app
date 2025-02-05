import React, { FC, useState, useMemo } from "react";
import {
  StyledWrapper,
  StyledWrapperSummary,
  StyledWrapperSummaryItem,
  StyledWrapperDetails,
  StyledLeftSide,
  StyledRightSide,
  StyledWrapperPotsSection,
  SectionHeader,
  StyledWrapperPotsSummary,
  StyledWrapperTotalSaved,
  PotsIconWrapper,
  ParagraphTotalSavedWrapper,
  PotsListWrapper,
  StyledWrapperBudgetsSection,
  BudgetAmountWrapper,
  StyledWrapperTransactionsSection,
  StyledWrapperBillsSection,
  BillsInfoWrapper,
} from "./Overview.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TransactionTable } from "../TransactionTable/TransactionTable.tsx";
import { Chart, ChartItems } from "../Chart/Chart.tsx";
import { Budgets } from "../Budgets/Budgets.tsx";
import { Transactions } from "../Transactions/Transactions.tsx";
import { RecurringBills } from "../RecurringBills/RecurringBills.tsx";
import { Pots } from "../Pots/Pots.tsx";
import {
  calculateTotalSpentInCategory,
  getSummaryRecurringBillsData,
} from "../../utils/transactionsUtils.ts";

interface SectionHeaderItemProps {
  title: string;
  buttonText: string;
  onClick: () => void;
}

const SectionHeaderItem: FC<SectionHeaderItemProps> = ({
  title,
  buttonText,
  onClick,
}) => {
  return (
    <SectionHeader>
      <h3>{title}</h3>
      <button onClick={onClick}>
        {buttonText}
        <img
          src={`${process.env.PUBLIC_URL}/images/icon-caret-right.svg`}
          alt="Icon caret right"
        />
      </button>
    </SectionHeader>
  );
};

export const Overview: FC = () => {
  const [activeView, setActiveView] = useState<
    "overview" | "pots" | "transactions" | "budgets" | "recurringBills"
  >("overview");

  const { balance, transactions, budgets, pots, isLoading, isError } =
    useSelector((state: RootState) => state.data);

  const summaryItemsRecurringBillsData = useSelector((state: RootState) =>
    getSummaryRecurringBillsData(state.data)
  );

  const dataState = useSelector((state: RootState) => state.data);

  const postSlice = pots.slice(0, 4);
  const totalSaveValue = pots.reduce((sum, pot) => sum + pot.total, 0);

  const transactionsSlice = transactions.slice(0, 5);

  const chartData = useMemo(() => {
    return budgets.map((budget) => {
      const spentMoneyValue = calculateTotalSpentInCategory(
        dataState,
        budget.category
      );

      return {
        name: budget.category,
        value: spentMoneyValue,
        theme: budget.theme,
      };
    });
  }, [budgets, dataState]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  if (activeView === "pots") return <Pots />;
  if (activeView === "transactions") return <Transactions />;
  if (activeView === "budgets") return <Budgets />;
  if (activeView === "recurringBills") return <RecurringBills />;

  return (
    <StyledWrapper>
      <h1>Overview</h1>
      <StyledWrapperSummary>
        {Object.entries(balance).map(([key, value]) => (
          <StyledWrapperSummaryItem key={key}>
            <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            <p>${value.toFixed(2)}</p>
          </StyledWrapperSummaryItem>
        ))}
      </StyledWrapperSummary>
      <StyledWrapperDetails>
        <StyledLeftSide>
          <StyledWrapperPotsSection>
            <SectionHeaderItem
              title={"Pots"}
              buttonText={"See details"}
              onClick={() => setActiveView("pots")}
            />
            <StyledWrapperPotsSummary>
              <StyledWrapperTotalSaved>
                <PotsIconWrapper>
                  <p>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-pot.svg`}
                      alt="Icon pot"
                    />
                  </p>
                </PotsIconWrapper>
                <ParagraphTotalSavedWrapper>
                  <p>Total Saved</p>
                  <p>${totalSaveValue}</p>
                </ParagraphTotalSavedWrapper>
              </StyledWrapperTotalSaved>
              <PotsListWrapper>
                {postSlice.map((pot) => (
                  <div key={pot.name}>
                    <p>{pot.name}</p>
                    <p>${pot.total.toFixed(2)}</p>
                  </div>
                ))}
              </PotsListWrapper>
            </StyledWrapperPotsSummary>
          </StyledWrapperPotsSection>

          <StyledWrapperTransactionsSection>
            <SectionHeaderItem
              title={"Transactions"}
              buttonText={"View all"}
              onClick={() => setActiveView("transactions")}
            />
            <TransactionTable filteredTransactions={transactionsSlice} />
          </StyledWrapperTransactionsSection>
        </StyledLeftSide>
        <StyledRightSide>
          <StyledWrapperBudgetsSection>
            <SectionHeaderItem
              title={"Budgets"}
              buttonText={"View all"}
              onClick={() => setActiveView("budgets")}
            />
            <BudgetAmountWrapper>
              <Chart chartData={chartData} />
              <div>
                {budgets.map((budget) => (
                  <ChartItems
                    key={budget.category}
                    category={budget.category}
                    theme={budget.theme}
                    spentMoneyValue={calculateTotalSpentInCategory(
                      dataState,
                      budget.category
                    )}
                    maximum={""}
                  />
                ))}
              </div>
            </BudgetAmountWrapper>
          </StyledWrapperBudgetsSection>

          <StyledWrapperBillsSection>
            <SectionHeaderItem
              title={"Recurring Bills"}
              buttonText={"View all"}
              onClick={() => setActiveView("recurringBills")}
            />
            <BillsInfoWrapper>
              {summaryItemsRecurringBillsData.map((item, index) => (
                <div key={index}>
                  <p>{item.title}</p>
                  <p>{item.content}</p>
                </div>
              ))}
            </BillsInfoWrapper>
          </StyledWrapperBillsSection>
        </StyledRightSide>
      </StyledWrapperDetails>
    </StyledWrapper>
  );
};

export default Overview;
