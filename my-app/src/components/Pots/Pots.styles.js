import styled from 'styled-components';

export const StyledWrapper = styled.div `
    margin: 2rem;
`;

export const StyledWrapperDetails = styled.div `
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (max-width: 990px) {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

export const StyledWrapperDetailsItem = styled.div `
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    width: 100%;
`;

export const ItemTotalSaved = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;

    p:first-child {
        font-size: 0.8rem;
        color: #696868;
    }

    p:last-child {
        font-size: 2rem;
        color: black;
        font-weight: 600;
        letter-spacing: 2px;
    }
`;

export const StyledLinearProgressDetails = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.7rem;

    p:first-child {
        font-size: 0.8rem;
        color: #696868;
        font-weight: 600;
    }

    p:last-child {
        font-size: 0.8rem;
        color: #696868;
    }
`;

export const StyledWrapperButtons = styled.div `
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    button {
        background-color: rgb(241, 239, 236);
        border: none;
        border-radius: 10px;
        font-weight: 600;
        padding: 1rem;
        transition: all 0.3s ease;
        &:hover {
            background-color: rgb(187, 185, 183);
            cursor: pointer;
        }
    }
`;