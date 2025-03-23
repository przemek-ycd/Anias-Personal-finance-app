import React, { FC } from "react";
import {
  StyledWrapperDialog,
  SectionHeaderDialog,
  ButtonSave,
} from "./CustomDialog.styles.js";
import { Dialog } from "@mui/material";
import { FormControl } from "@mui/material";
import { SelectDropdown } from "../SelectDropdown/SelectDropdown.tsx";
import { TextFieldComponent } from "../TextField/TextField.tsx";

const colors = {
  Green: "#277C78",
  Grey: "#626070",
  Cyan: "#82C9D7",
  Yellow: "#F2CDAC",
  Navy: "#826CB0",
};

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  formData: {
    categoryName: string;
    targetAmount: number;
    themeColor: string;
  };
  onSave: (data: any) => void;
  onSaveButton: () => void;
}

export const CustomDialog: FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  description,
  formData,
  onSave,
  onSaveButton,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <StyledWrapperDialog>
        <SectionHeaderDialog>
          <h1>{title}</h1>
          <button onClick={onClose}>X</button>
        </SectionHeaderDialog>
        <p>{description}</p>
        <div>
          <TextFieldComponent
            label="Budget Name"
            name="name"
            value={formData.categoryName}
            onChange={(e) =>
              onSave({ ...formData, categoryName: e.target.value })
            }
            type="text"
          />
        </div>
        <div>
          <TextFieldComponent
            label="Target Amount ($)"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={(e) =>
              onSave({ ...formData, targetAmount: Number(e.target.value) })
            }
            type="number"
          />
        </div>
        <FormControl fullWidth required>
          <SelectDropdown
            label="Theme Color"
            selectOptions={Object.keys(colors)}
            onChange={(value) => onSave({ ...formData, themeColor: value })}
          />
        </FormControl>
        <ButtonSave onClick={onSaveButton}>Save</ButtonSave>
      </StyledWrapperDialog>
    </Dialog>
  );
};
