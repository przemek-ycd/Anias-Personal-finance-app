import React, { FC, useState } from "react";
import {
  StyledWrapper,
  SectionHeader,
  StyledWrapperDetails,
  StyledWrapperChart,
  BudgetSummary,
  StyledWrapperDetailsItems,
  DetailsItem,
  ItemHeader,
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
import { useDispatch } from "react-redux";
import { removeBudget, editBudget, addBudget } from "../../store/data.ts";
import { MoneyManageDialog } from "../MoneyManageDialog/MoneyManageDialog.tsx";

interface DetailsItemComponentProps {
  category: string;
  theme: string;
  maximum: number;
}

export const DetailsItemComponent: FC<DetailsItemComponentProps> = ({
  category,
  theme,
  maximum,
}) => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state: RootState) => state.data);

  const lastThreeTransactionsByCategory = getLastThreeTransactionsByCategory(
    transactions,
    category
  );

  const spentMoneyValue = calculateTotalSpentInLastThreeTransactions(
    lastThreeTransactionsByCategory
  );

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const freeMoneyValue = maximum - spentMoneyValue;

  const handleEditSubmit = (updatedData: {
    newName: string;
    newTarget: number;
    color: string;
  }) => {
    dispatch(
      editBudget({
        category,
        newName: updatedData.newName,
        newTarget: updatedData.newTarget,
        color: updatedData.color,
      })
    );
    setIsEditDialogOpen(false);
  };

  const handleRemoveBudget = (name: string) => {
    dispatch(removeBudget(name));
  };

  return (
    <>
      <DetailsItem>
        <ItemHeader>
          <div>
            <HeaderItem
              color={theme}
              name={category}
              onEdit={() => setIsEditDialogOpen(true)}
              onDelete={() => handleRemoveBudget(category)}
            />
            <MoneyManageDialog
              open={isEditDialogOpen}
              onClose={() => setIsEditDialogOpen(false)}
              title={`Edit Budget`}
              description={`If your saving targets change, feel free to update your Budgets.`}
              formData={{
                newName: category,
                newTarget: maximum,
                color: theme,
              }}
              onSave={handleEditSubmit}
            />
          </div>
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
          <TransactionTable
            filteredTransactions={lastThreeTransactionsByCategory}
          />
        </StyledWrapperTransactionsSection>
      </DetailsItem>
    </>
  );
};

export const Budgets: FC = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state: RootState) => state.data);
  const { budgets } = dataState;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const maxLimitValue = budgets.map((budget) => Math.abs(budget.maximum));
  const roundedMaxLimitValue = maxLimitValue
    .reduce((sum, maximum) => sum + maximum, 0)
    .toFixed(2);

  const chartData = budgets.map((budget) => {
    const spentMoneyValue = calculateTotalSpentInCategory(
      dataState,
      budget.category
    );

    return {
      category: budget.category,
      spentMoneyValue: spentMoneyValue,
      color: budget.theme,
    };
  });

  const totalValue = chartData
    .reduce((sum, item) => sum + item.spentMoneyValue, 0)
    .toFixed(2);

  const handleSave = (newBudgetData: {
    newName: string;
    newTarget: number;
    color: string;
  }) => {
    dispatch(
      addBudget({
        category: newBudgetData.newName,
        maximum: newBudgetData.newTarget,
        theme: newBudgetData.color,
      })
    );
    setIsDialogOpen(false);
  };

  return (
    <StyledWrapper>
      <div>
        <Header title="Budget" onOpen={() => setIsDialogOpen(true)} />
        <MoneyManageDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={`Add New Budget`}
          description={`Create a Budget to set savings targets`}
          formData={{}}
          onSave={handleSave}
        />
      </div>
      <StyledWrapperDetails>
        <StyledWrapperChart>
          <Chart chartData={chartData} />
          <BudgetSummary>
            <p>${totalValue}</p>
            <p>of ${roundedMaxLimitValue} limit</p>
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
