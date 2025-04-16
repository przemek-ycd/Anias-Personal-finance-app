import React, { FC, useState } from "react";
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
import { MoneyPotsDialog } from "../MoneyPotsDialog/MoneyPotsDialog.tsx";
import { useDispatch } from "react-redux";
import {
  addPot,
  removePot,
  editPot,
  updatePotAmount,
} from "../../store/data.ts";
import {
  MoneyManageDialog,
  FormData,
} from "../MoneyManageDialog/MoneyManageDialog.tsx";

interface DetailsItemComponentProps {
  name: string;
  theme: string;
  total: number;
  target: number;
}

const DetailsItemComponent: FC<DetailsItemComponentProps> = ({
  name,
  theme,
  total,
  target,
}) => {
  const dispatch = useDispatch();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [initialAmount, setInitialAmount] = useState(0);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

  const handleAddMoney = (inputValue: number) => {
    dispatch(updatePotAmount({ name, newTotal: total + inputValue }));
  };

  const handleWithdrawMoney = (inputValue: number) => {
    dispatch(updatePotAmount({ name, newTotal: total - inputValue }));
  };

  const handleEditSubmit = (updatedData: {
    newName: string;
    newTarget: number;
    color: string;
  }) => {
    dispatch(
      editPot({
        name,
        newName: updatedData.newName,
        newTarget: updatedData.newTarget,
        color: updatedData.color,
      })
    );
    setIsEditDialogOpen(false);
  };

  const handleRemovePot = (name: string) => {
    dispatch(removePot(name));
  };

  const progressPercentages = Math.round(
    target > 0 ? (total / target) * 100 : 0
  );

  const handleAmountChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setInitialAmount(value);
  };

  const handleAddDialogSave = (val: number) => {
    handleAddMoney(val);
    setIsAddDialogOpen(false);
  };

  const handleWithdrawDialogSave = (val: number) => {
    handleWithdrawMoney(val);
    setIsWithdrawDialogOpen(false);
  };

  return (
    <StyledWrapperDetailsItem key={name}>
      <div>
        <HeaderItem
          color={theme}
          name={name}
          onEdit={() => setIsEditDialogOpen(true)}
          onDelete={() => handleRemovePot(name)}
        />
        <MoneyManageDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          title={`Edit Pot`}
          description={`If your saving targets change, feel free to update your Pots.`}
          formData={{
            newName: name,
            newTarget: target,
            color: theme,
          }}
          onSave={handleEditSubmit}
        />
      </div>
      <ItemTotalSaved>
        <p>Total Saved</p>
        <p>${total.toFixed(2)}</p>
      </ItemTotalSaved>
      <Box
        sx={{
          marginTop: "2rem",
        }}
      >
        <LinearProgressBar
          height={"20px"}
          border={"2px solid rgb(241, 239, 236)"}
          backgroundColor={theme}
          value={progressPercentages}
        />
        <StyledLinearProgressDetails>
          <p>{progressPercentages}%</p>
          <p>Target of ${target.toFixed(2)}</p>
        </StyledLinearProgressDetails>
      </Box>

      <StyledWrapperButtons>
        <MoneyPotsDialog
          buttonContent={"Add money"}
          dialogTitle={"Add money to"}
          target={target}
          initialAmount={initialAmount}
          calculateNewTotalAmount={(initialAmount) => total + initialAmount}
          handleSave={handleAddDialogSave}
          onInputChange={handleAmountChange}
          isOpen={isAddDialogOpen}
          onOpen={() => setIsAddDialogOpen(true)}
          onClose={() => setIsAddDialogOpen(false)}
        />

        <MoneyPotsDialog
          buttonContent={"Withdraw"}
          dialogTitle={"Withdraw from"}
          target={target}
          initialAmount={initialAmount}
          calculateNewTotalAmount={(initialAmount) => total - initialAmount}
          handleSave={handleWithdrawDialogSave}
          onInputChange={handleAmountChange}
          isOpen={isWithdrawDialogOpen}
          onOpen={() => setIsWithdrawDialogOpen(true)}
          onClose={() => setIsWithdrawDialogOpen(false)}
        />
      </StyledWrapperButtons>
    </StyledWrapperDetailsItem>
  );
};

export const Pots: FC = () => {
  const dispatch = useDispatch();
  const { pots } = useSelector((state: RootState) => state.data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (newPotData: {
    newName: string;
    newTarget: number;
    color: string;
  }) => {
    dispatch(
      addPot({
        name: newPotData.newName,
        target: newPotData.newTarget,
        total: 0,
        theme: newPotData.color,
      })
    );

    setIsDialogOpen(false);
  };

  return (
    <StyledWrapper>
      <div>
        <Header title="Pot" onOpen={() => setIsDialogOpen(true)} />
        <MoneyManageDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Add New Pot"
          description="Create a Pot to set savings targets"
          formData={{
            newName: "",
            newTarget: 0,
            color: "",
          }}
          onSave={handleSave}
        />
      </div>
      <StyledWrapperDetails>
        {pots.map((pot) => (
          <DetailsItemComponent
            key={`${pot.target}-${pot.name}-${pot.theme}-${pot.total}`}
            target={pot.target}
            name={pot.name}
            theme={pot.theme}
            total={pot.total}
          />
        ))}
      </StyledWrapperDetails>
    </StyledWrapper>
  );
};

export default Pots;
