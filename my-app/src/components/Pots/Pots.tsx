import React, { FC } from "react";
import {
  StyledWrapper,
  StyledWrapperDetails,
  StyledWrapperDetailsItem,
  ItemTotalSaved,
  StyledLinearProgressDetails,
  StyledWrapperButtons,
} from "./Pots.styles";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LinearProgressBar } from "../LinearProgressBar/LinearProgressBar.tsx";
import { HeaderItem } from "../HeaderItem/HeaderItem.tsx";
import { Header } from "../Header/Header.tsx";
import { ButtonMoney } from "../ButtonMoneyPots/ButtonMoneyPots.tsx";

export const Pots: FC = () => {
  const { pots } = useSelector((state: RootState) => state.data);

  const progressPercentages = pots.map((pot) =>
    Math.round(pot.target > 0 ? (pot.total / pot.target) * 100 : 0)
  );

  return (
    <StyledWrapper>
      <Header title="Pot" type="pot" />
      <StyledWrapperDetails>
        {pots.map((pot, index) => (
          <StyledWrapperDetailsItem key={pot.name}>
            <HeaderItem data={pot} title={"Pot"} name={pot.name} type="pot" />
            <ItemTotalSaved>
              <p>Total Saved</p>
              <p>${pot.total.toFixed(2)}</p>
            </ItemTotalSaved>
            <Box
              sx={{
                marginTop: "2rem",
              }}
            >
              <LinearProgressBar
                height={"20px"}
                border={"2px solid rgb(241, 239, 236)"}
                backgroundColor={pot.theme}
                value={progressPercentages[index]}
              />
              <StyledLinearProgressDetails>
                <p>{progressPercentages[index]}%</p>
                <p>Target of ${pot.target.toFixed(2)}</p>
              </StyledLinearProgressDetails>
            </Box>

            <StyledWrapperButtons>
              <ButtonMoney
                buttonContent={"Add money"}
                dialogContent={"Add money to"}
                target={pot.target}
                calculateNewTotalAmount={(inputValue) => pot.total + inputValue}
                potName={pot.name}
              />
              <ButtonMoney
                buttonContent={"Withdraw"}
                dialogContent={"Withdraw from "}
                target={pot.target}
                calculateNewTotalAmount={(inputValue) => pot.total - inputValue}
                potName={pot.name}
              />
            </StyledWrapperButtons>
          </StyledWrapperDetailsItem>
        ))}
      </StyledWrapperDetails>
    </StyledWrapper>
  );
};

export default Pots;
