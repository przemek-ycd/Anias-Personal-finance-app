import styled, { keyframes } from 'styled-components';
import { PropagateLoader } from 'react-spinners';

const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const StyledWrapper = styled.div `
    white-space: nowrap;
    width: 100%;
    animation: ${scroll} 100s linear infinite;
`;

export const ContentWrapper = styled.div`
  display: inline-block;
  padding: 10px;
  padding-left: 6rem;

  p:first-child {
    display: inline-block;
    color: #696868;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 0.9rem;
    padding-right: 5px;
  }

  p:last-child {
    display: inline-block;
    color: #696868;
    font-size: 0.9rem;
  }

  button {
    padding: 3px;
    background-color: rgb(241, 239, 236);
    color: #696868;
    border: 1px solid #696868;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      color: black;
      cursor: pointer;
      border: 1px solid black;
    }
  }
`;

export const LoaderWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const StyledLoader = styled(PropagateLoader).attrs({
  color:" #f1efec",
  size: 15,
})``;