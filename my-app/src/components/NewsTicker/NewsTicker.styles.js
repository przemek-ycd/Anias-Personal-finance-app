import styled, { keyframes } from 'styled-components';

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

    div {
        display: inline-block;
        padding: 5px;
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
    }
`;
