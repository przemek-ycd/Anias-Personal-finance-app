import React, { FC } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StyledWrapperChartItems, ParagraphAmount } from "./Chart.styles";

interface ChartItemsProps {
  category: string;
  theme: string;
  maximum: React.ReactNode;
  spentMoneyValue: number;
}

export const ChartItems: FC<ChartItemsProps> = ({
  category,
  maximum,
  theme,
  spentMoneyValue,
}) => {
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

interface ChartProps {
  chartData: ChartItemsProps[];
}

export const Chart: React.FC<ChartProps> = ({ chartData }) => {
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
          {chartData.map((entry) => (
            <Cell
              key={`cell-${entry.category}-${entry.theme}-${entry.spentMoneyValue}`}
              fill={entry.theme}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
