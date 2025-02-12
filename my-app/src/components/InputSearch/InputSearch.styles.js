import { FormControl, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledFormControl = styled(FormControl)`
    width: 100% !important;
`

export const StyledTextField = styled(TextField)`
    & label.Mui-focused {
        color: black;
    }

    & MuiFormControl.MuiTextField  {
        margin-bottom: 2rem;
    }

    & .MuiOutlinedInput-root {
        margin-bottom: 2rem;
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
