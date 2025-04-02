import styled from 'styled-components';

export const SectionHeaderDialog = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: start;

    h1 {
        margin-bottom: 2rem;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        padding: 10px;
        border: 1px solid black;
        background-color: transparent;
        color: #696868;
        transition: all 0.3s ease;
        &:hover {
            cursor: pointer;
            color: #fff;
            background-color: black;
        }
    }
`;

export const SaveButton = styled.button `
    width: 100%;
    border: none;
    border-radius: 10px;
    background-color: black;
    color: #fff;
    padding: 1rem;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
    &:hover {
        background-color: #696868;
        cursor: pointer;
    }
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
    margin-bottom: 1.2rem;

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