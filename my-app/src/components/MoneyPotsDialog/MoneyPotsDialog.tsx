import React, { FC, useMemo } from "react";
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
  calculateNewTotalAmount: (initialAmount: number) => number;
  handleSave: (initialAmount: number) => void;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  initialAmount: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const MoneyPotsDialog: FC<MoneyPotsDialogProps> = ({
  buttonContent,
  dialogTitle,
  target,
  handleSave,
  calculateNewTotalAmount,
  onInputChange,
  initialAmount,
  isOpen,
  onOpen,
  onClose,
}) => {
  const newTotalAmount = calculateNewTotalAmount(initialAmount);

  const progressAmount = useMemo(() => {
    return Math.round(target > 0 ? (newTotalAmount / target) * 100 : 0);
  }, [newTotalAmount, target]);

  const handleSaveClick = () => {
    handleSave(initialAmount);
  };

  return (
    <>
      <button onClick={onOpen}>{buttonContent}</button>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          <SectionHeaderDialog>
            <h1>{dialogTitle} ‘Savings’</h1>
            <button onClick={onClose}>X</button>
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
            <p>Target of ${Number(target).toFixed(2)}</p>
          </StyledLinearProgressDetails>
          <div>
            <TextFieldComponent
              label="Target Amount ($)"
              name="targetAmount"
              value={initialAmount}
              onChange={onInputChange}
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
