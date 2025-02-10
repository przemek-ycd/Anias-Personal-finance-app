import React, { FC, useState } from "react";
import { MenuItem } from "@mui/material";
import {
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "./SelectSortBy.styles";

interface SelectElementProps {
  label: string;
  selectOptions: Array<string>;
  onChange: (value: string) => void;
}

export const SelectSortBy: FC<SelectElementProps> = ({
  label,
  selectOptions,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState("All");

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
        label={label}
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
