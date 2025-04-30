import { FormControl, InputLabel, Select } from "@mui/material";
import styled from "styled-components";

export const StyledFormControl = styled(FormControl)`
    width: 100%;
    margin-bottom: 4rem !important;
    margin-left: 20px;

    fieldset {
      color: black !important;
        legend {
          height: 22px;
        }
        span {
          opacity: 1;
          padding-bottom:10px;
    }
  }
`;

export const StyledInputLabel = styled(InputLabel)`
    &.css-113d811-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
        color: black;
    }
`;

export const StyledSelect = styled(Select)`
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: black !important;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: black !important;
  }
`;