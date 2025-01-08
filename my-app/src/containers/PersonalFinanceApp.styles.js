import styled from 'styled-components';

export const StyledWrapper = styled.div `
    display: flex;
`;

export const StyledWrapperTypography = styled.div `
    margin-bottom: 2rem;
    padding: 3rem;
`;

export const ButtonMinimizeMenu = styled.button `
    background-color: transparent;
    border: none;
    color: #B3B3B3;
    transition: all 0.3s ease;
    &:hover {
        color: #fff;
        cursor: pointer;
    }

    img {
        padding-right: 5px;
    }
`;

export const StyledWrapperList = styled.div `
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1rem;
        background-color: transparent;
        color: #B3B3B3;
        border: none;
        font-size: 1.2rem;
        margin: 1rem;
        transition: all 0.3s ease;
        &:hover {
            color: #fff;
            cursor: pointer;
        }

        img {
            margin-right: 1rem;
        }
    }
`;