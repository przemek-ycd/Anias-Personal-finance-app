import React, { FC } from "react";
import { StyledTextField } from "./TextField.styles";

interface TextFieldComponentProps {
  label: string;
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
}

export const TextFieldComponent: FC<TextFieldComponentProps> = ({
  label,
  name,
  value,
  onChange,
  type,
}) => {
  return (
    <StyledTextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
};
