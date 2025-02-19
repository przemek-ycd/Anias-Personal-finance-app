import React, { FC } from "react";
import {
  StyledWrapperDialog,
  SectionHeaderDialog,
  ButtonSave,
} from "./Dialog.styles.js";
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

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  formData: {
    categoryName: string;
    targetAmount: number;
    themeColor: string;
  };
  setFormData: (data: any) => void;
  onSave: () => void;
}

export const CustomDialog: FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  formData,
  setFormData,
  onSave,
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
              setFormData({ ...formData, categoryName: e.target.value })
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
              setFormData({ ...formData, targetAmount: Number(e.target.value) })
            }
            type="number"
          />
        </div>
        <FormControl fullWidth required>
          <SelectDropdown
            label="Theme Color"
            selectOptions={Object.keys(colors)}
            onChange={(value) =>
              setFormData({ ...formData, themeColor: value })
            }
          />
        </FormControl>
        <ButtonSave onClick={onSave}>Save</ButtonSave>
      </StyledWrapperDialog>
    </Dialog>
  );
};
