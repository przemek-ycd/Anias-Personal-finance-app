import React, { FC } from "react";
import { StyledFormControl, StyledTextField } from "./InputSearch.styles";

interface InputSearchProps {
  searchTerm: string;
  onChange: (value: string) => void;
}

export const InputSearch: FC<InputSearchProps> = ({ searchTerm, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <StyledFormControl>
      <StyledTextField
        id="search-input"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
    </StyledFormControl>
  );
};
