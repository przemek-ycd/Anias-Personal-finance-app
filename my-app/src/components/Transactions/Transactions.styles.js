import styled from 'styled-components';
import { TableCell } from "@mui/material";

export const StyledWrapper = styled.div `
    margin: 2rem;
`;

export const SectionHeader = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const StyledWrapperDetails = styled.div `
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
`;

export const StyledWrapperDetailsHeader = styled.div `
    div{
        display:flex;
        justify-content: space-between;
        gap: 24px;
        margin-left: 0;
    }
`

export const ImageWrapper = styled.div `
    display: flex;
    align-items: center;
    text-align: center;

    img{
        margin-right: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%
    }

    p {
        font-weight: 700;
    }
`;

export const StyledTableCell = styled(TableCell)`
    &.MuiTableCell-root.MuiTableCell-head {
        color: #696868;
        font-weight: 700;
    }
    &.MuiTableCell-root.MuiTableCell-body {
        color: ${({ isNegative }) => (isNegative ? "black" : "rgb(39, 124, 120)")};
        font-weight: 700;
    }
`
;
