import { FormControl, InputLabel, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledFormControl = styled(FormControl)`
    width: 100% !important;
`

export const StyledInputLabel = styled(InputLabel)`
    &.css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root {
        display: ${({ searchTerm }) => (searchTerm ? "none" : "block")};
        color: black !important;
    }
`

export const StyledTextField = styled(TextField)`
    &.css-113d811-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
        color: black !important;
    }
    &.css-1xp5r68-MuiFormControl-root-MuiTextField-root  {
        margin-bottom: 2rem;
    }

    & .MuiOutlinedInput-root {
        &:hover .MuiOutlinedInput-notchedOutline: {
            border-color: black !important;
        },
        &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: black !important;
        },
        &.MuiInputLabel-root.Mui-focused {
            color: black !important;
        },
    },
`