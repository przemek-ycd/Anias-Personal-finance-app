import React, { FC, useState } from "react";
import { MenuItem } from "@mui/material";
import {
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "./SelectDropdown.styles";

interface SelectElementProps {
  label: string;
  selectOptions: Array<string>;
  onChange: (value: string) => void;
}

export const SelectDropdown: FC<SelectElementProps> = ({
  label,
  selectOptions,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("All");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <StyledFormControl>
      <StyledInputLabel id="category-select-label">{label}</StyledInputLabel>
      <StyledSelect
        labelId="category-select-label"
        id="category-select"
        value={selectedOption}
        onChange={handleChange}
      >
        {selectOptions.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};
