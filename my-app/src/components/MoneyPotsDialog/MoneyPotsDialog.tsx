import React, { FC, useState, useMemo } from "react";
import {
  SectionHeaderDialog,
  SaveButton,
  ItemTotalSaved,
  StyledLinearProgressDetails,
} from "./MoneyPotsDialog.styles.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LinearProgressBar } from "../LinearProgressBar/LinearProgressBar.tsx";
import { TextFieldComponent } from "../TextField/TextField.tsx";

interface MoneyPotsDialogProps {
  buttonContent: string;
  dialogTitle: string;
  target: number;
  calculateNewTotalAmount: (inputValue: number) => number;
  handleSave: (inputValue: number) => void;
}

export const MoneyPotsDialog: FC<MoneyPotsDialogProps> = ({
  buttonContent,
  dialogTitle,
  target,
  handleSave,
  calculateNewTotalAmount,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const newTotalAmount = calculateNewTotalAmount(inputValue);

  const progressAmount = useMemo(() => {
    return Math.round(target > 0 ? (newTotalAmount / target) * 100 : 0);
  }, [newTotalAmount, target]);

  const handleTextChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setInputValue(value);
  };

  const handleSaveClick = () => {
    handleSave(inputValue);
    setIsDialogOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsDialogOpen(true)}>{buttonContent}</button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          <SectionHeaderDialog>
            <h1>{dialogTitle} ‘Savings’</h1>
            <button onClick={() => setIsDialogOpen(false)}>X</button>
          </SectionHeaderDialog>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogTitle} your pot to increase your savings. This will add to
            the amount you have in this pot.
          </DialogContentText>
          <ItemTotalSaved>
            <p>New Amount</p>
            <p>${newTotalAmount.toFixed(2)}</p>
          </ItemTotalSaved>
          <div>
            <LinearProgressBar
              height={"15px"}
              border={"2px solid rgb(241, 239, 236)"}
              backgroundColor="#277C78"
              value={progressAmount}
            />
          </div>
          <StyledLinearProgressDetails>
            <p>{progressAmount}%</p>
            <p>Target of ${target.toFixed(2)}</p>
          </StyledLinearProgressDetails>
          <div>
            <TextFieldComponent
              label="Target Amount ($)"
              name="targetAmount"
              value={inputValue}
              onChange={handleTextChange}
              type="number"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <SaveButton onClick={handleSaveClick}>Save changes</SaveButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
