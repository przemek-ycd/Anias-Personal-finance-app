import React, { FC } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StyledWrapperChartItems, ParagraphAmount } from "./Chart.styles";

interface ChartItemsProps {
  category: string;
  color: string;
  spentMoneyValue: number;
}

export const ChartItems: FC<ChartItemsProps> = ({
  category,
  color,
  spentMoneyValue,
}) => {
  return (
    <StyledWrapperChartItems>
      <p style={{ borderLeft: `3px solid ${color}` }}>{category}</p>
      <ParagraphAmount>
        <p>${spentMoneyValue}</p>
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
          dataKey="spentMoneyValue"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {chartData.map((entry) => (
            <Cell
              key={`cell-${entry.category}-${entry.color}-${entry.spentMoneyValue}`}
              fill={entry.color}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
