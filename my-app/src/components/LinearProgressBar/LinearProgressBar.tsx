import React, { FC } from "react";
import {
  ProgressBarContainer,
  StyledLinearProgress,
} from "./LinearProgressBar.styles";

interface LinearProgressBarProps {
  height: string;
  border: string;
  backgroundColor: string;
  value: number;
}

export const LinearProgressBar: FC<LinearProgressBarProps> = ({
  height,
  border,
  backgroundColor,
  value,
}) => {
  return (
    <ProgressBarContainer>
      <StyledLinearProgress
        variant="determinate"
        height={height}
        backgroundColor={backgroundColor}
        border={border}
        value={value}
      />
    </ProgressBarContainer>
  );
};
