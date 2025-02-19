import React, { FC } from "react";
import {
  StyledWrapper,
  SectionHeader,
  StyledWrapperDetails,
  StyledWrapperChart,
  BudgetSummary,
  StyledWrapperDetailsItems,
  DetailsItem,
  ItemHeader,
  Dot,
  Money,
  SpentMoney,
  FreeMoney,
  StyledWrapperTransactionsSection,
} from "./Budgets.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LinearProgressBar } from "../LinearProgressBar/LinearProgressBar.tsx";
import { TransactionTable } from "../TransactionTable/TransactionTable.tsx";
import { Chart, ChartItems } from "../Chart/Chart.tsx";
import { Header } from "../Header/Header.tsx";
import { HeaderItem } from "../HeaderItem/HeaderItem.tsx";
import {
  calculateTotalSpentInCategory,
  getLastThreeTransactionsByCategory,
  calculateTotalSpentInLastThreeTransactions,
} from "../../utils/transactionsUtils.ts";

interface DetailsItemComponentProps {
  category: string;
  theme: string;
  maximum: number;
}

const DetailsItemComponent: FC<DetailsItemComponentProps> = ({
  category,
  theme,
  maximum,
}) => {
  const { transactions } = useSelector((state: RootState) => state.data);
  const { budgets } = useSelector((state: RootState) => state.data);

  const filteredTransactions = getLastThreeTransactionsByCategory(
    transactions,
    category
  );

  const spentMoneyValue =
    calculateTotalSpentInLastThreeTransactions(filteredTransactions);

  const freeMoneyValue = maximum - spentMoneyValue;

  return (
    <>
      <DetailsItem>
        <ItemHeader>
          <p>
            <Dot style={{ backgroundColor: theme }}></Dot>
            {category}
          </p>
          <HeaderItem title="Budget" data={budgets} category={category} />
        </ItemHeader>
        <p>Maximum of ${maximum}</p>
        <LinearProgressBar
          height={"35px"}
          border={"5px solid rgb(241, 239, 236)"}
          backgroundColor={theme}
          value={freeMoneyValue < 0 ? 100 : (spentMoneyValue / maximum) * 100}
        />

        <Money>
          <SpentMoney>
            <p>Spent</p>
            <p>${spentMoneyValue}</p>
          </SpentMoney>
          <FreeMoney>
            <p>Free</p>
            <p>${freeMoneyValue}</p>
          </FreeMoney>
        </Money>
        <StyledWrapperTransactionsSection>
          <SectionHeader>
            <h4>Latest Spending</h4>
          </SectionHeader>
          <TransactionTable filteredTransactions={filteredTransactions} />
        </StyledWrapperTransactionsSection>
      </DetailsItem>
    </>
  );
};

export const Budgets: FC = () => {
  const { budgets } = useSelector((state: RootState) => state.data);
  const dataState = useSelector((state: RootState) => state.data);

  const maxLimitValue = budgets
    .map((budget) => Math.abs(budget.maximum))
    .reduce((sum, maximum) => sum + maximum, 0)
    .toFixed(2);

  const chartData = budgets.map((budget) => {
    const spentMoneyValue = calculateTotalSpentInCategory(
      dataState,
      budget.category
    );

    return {
      name: budget.category,
      value: spentMoneyValue,
      color: budget.theme,
    };
  });

  const totalValue = chartData
    .reduce((sum, item) => sum + item.value, 0)
    .toFixed(2);

  return (
    <StyledWrapper>
      <Header title="Budget" />
      <StyledWrapperDetails>
        <StyledWrapperChart>
          <Chart chartData={chartData} />
          <BudgetSummary>
            <p>${totalValue}</p>
            <p>of ${maxLimitValue} limit</p>
          </BudgetSummary>
          <div>
            <h3>Spending Summary</h3>
            <div>
              {budgets.map((budget) => (
                <ChartItems
                  category={budget.category}
                  color={budget.theme}
                  spentMoneyValue={calculateTotalSpentInCategory(
                    dataState,
                    budget.category
                  )}
                  maximum={budget.maximum}
                />
              ))}
            </div>
          </div>
        </StyledWrapperChart>

        <StyledWrapperDetailsItems>
          {budgets.map((budget) => (
            <DetailsItemComponent
              key={`${budget.category}-${budget.theme}-${budget.maximum}`}
              category={budget.category}
              theme={budget.theme}
              maximum={budget.maximum}
            />
          ))}
        </StyledWrapperDetailsItems>
      </StyledWrapperDetails>
    </StyledWrapper>
  );
};

export default Budgets;
