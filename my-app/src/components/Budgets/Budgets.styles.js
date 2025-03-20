import styled from 'styled-components';

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
    display: flex;
    gap: 10px;

    @media (max-width: 990px) {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

export const StyledWrapperChart = styled.div `
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    height: 100%;
`;

export const BudgetSummary = styled.div `
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 3rem;

    p:first-child {
        font-size: 1.5rem;
        font-weight: 600;
        padding-bottom: 0.5rem;
    }

    p:last-child {
        font-size: 0.8rem;
        color: #696868;
    }
`;

export const StyledWrapperDetailsItems = styled.div `
    width: 100%;
`;

export const DetailsItem = styled.div `
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 1rem;

    p {
        font-size: 0.8rem;
        color: #696868;
        font-weight: 600;
    }
`;

export const ItemHeader = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    p {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        color: black;
        font-weight: 600;

        div {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-right: 0.5rem;
        }
    }

    button {
        background-color: transparent;
        border: none;
        transition: all 0.3s ease;
        &:hover {
            cursor: pointer;
        }
    }
`;

export const Dot = styled.div `
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${(props) => props.theme}
`;

export const Money = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export const SpentMoney = styled.div `
    padding-left: 0.5rem;
    border-left: 3px solid #277C78;

    p:first-child {
        font-size: 0.8rem;
        color: #696868;
        padding-bottom: 0.5rem;
    }

    p:last-child {
        font-size: 0.9rem;
        color: black;
        font-weight: 700;
        letter-spacing: 1px;
    }
`;

export const FreeMoney = styled.div `
    padding-left: 0.5rem;
    border-left: 3px solid #b3b3b3;

    p:first-child {
        font-size: 0.8rem;
        color: #696868;
        padding-bottom: 0.5rem;
    }

    p:last-child {
        font-size: 0.9rem;
        color: black;
        font-weight: 700;
        letter-spacing: 1px;
    }
`;

export const StyledWrapperTransactionsSection = styled.div `
    background-color: rgb(241, 239, 236);
    border-radius: 20px;
    padding: 1.2rem;
    margin-top: 1rem;
`;
