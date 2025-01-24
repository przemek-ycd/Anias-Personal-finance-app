import React, { FC } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { StyledWrapperChartItems, ParagraphAmount } from "./Chart.styles";

interface ChartItemsProps {
  category: string;
  theme: string;
  maximum: React.ReactNode;
}

export const ChartItems: FC<ChartItemsProps> = ({
  category,
  maximum,
  theme,
}) => {
  const { transactions } = useSelector((state: RootState) => state.data);

  const filteredTransactions = transactions
    .filter((transaction) => transaction.category === category)
    .slice(0, 3);

  const spentMoneyValue = filteredTransactions
    .map((transaction) => Math.abs(transaction.amount))
    .reduce((sum, amount) => sum + amount, 0);

  return (
    <StyledWrapperChartItems>
      <p style={{ borderLeft: `3px solid ${theme}` }}>{category}</p>
      <ParagraphAmount>
        <p>${spentMoneyValue}</p>
        {maximum}
      </ParagraphAmount>
    </StyledWrapperChartItems>
  );
};

export const Chart: React.FC = () => {
  const { transactions, budgets } = useSelector(
    (state: RootState) => state.data
  );

  const chartData = budgets.map((budget) => {
    const filteredTransactions = transactions
      .filter((transaction) => transaction.category === budget.category)
      .slice(0, 3);

    const spentMoneyValue = filteredTransactions
      .map((transaction) => Math.abs(transaction.amount))
      .reduce((sum, amount) => sum + amount, 0);

    return {
      name: budget.category,
      value: spentMoneyValue,
      theme: budget.theme,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.theme} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
