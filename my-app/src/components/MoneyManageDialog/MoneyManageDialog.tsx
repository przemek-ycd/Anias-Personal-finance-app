import React, { FC, useState } from "react";
import {
  StyledWrapperDialog,
  SectionHeaderDialog,
  ButtonSave,
} from "./MoneyManageDialog.styles.js";
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

export interface FormData {
  newName: string;
  newTarget: number;
  color: string;
}

interface MoneyManageDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  formData: FormData | {};
  onSave: (data: FormData) => void;
}

export const MoneyManageDialog: FC<MoneyManageDialogProps> = ({
  open,
  onClose,
  title,
  description,
  formData: initialFormData,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData | {}>(initialFormData);

  const handleOnChange = (e, fieldName: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handleSelectChange = (value: string, fieldName: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleOnSave = () => {
    onSave(formData as FormData);
  };

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
            label={`${title} Name`}
            name="name"
            value={(formData as FormData).newName}
            onChange={(e) => handleOnChange(e, "newName")}
            type="text"
          />
        </div>
        <div>
          <TextFieldComponent
            label="Target Amount ($)"
            name="targetAmount"
            value={(formData as FormData).newTarget}
            onChange={(e) => handleOnChange(e, "newTarget")}
            type="number"
          />
        </div>
        <FormControl fullWidth required>
          <SelectDropdown
            label="Theme Color"
            selectOptions={Object.keys(colors)}
            onChange={(value) => handleSelectChange(value, "color")}
          />
        </FormControl>
        <ButtonSave onClick={handleOnSave}>Save</ButtonSave>
      </StyledWrapperDialog>
    </Dialog>
  );
};
