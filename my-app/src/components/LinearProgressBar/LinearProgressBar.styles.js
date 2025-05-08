import styled from "styled-components";
import { LinearProgress, Box } from "@mui/material";

export const ProgressBarContainer = styled(Box)`
  width: 100%;
  margin-right: 2rem;
  margin-top: 1rem;
  
  & .MuiLinearProgress-root {
    height: ${(props) => props.height};
    background-color: rgb(241, 239, 236);
  }
`;

export const StyledLinearProgress = styled(LinearProgress)`
width: 100%;
height: ${(props) => props.height};
background-color: rgb(241, 239, 236);
border-radius: 20px;
border: ${(props) => props.border};

& .MuiLinearProgress-bar {
  background-color: ${(props) => props.backgroundColor};
  border-radius: 20px;
}

& .MuiLinearProgress-root {
  height: 12px;
}
`;
