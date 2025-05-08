import styled from 'styled-components';

export const StyledWrapper = styled.div `
    margin: 2rem;

    h1 {
        margin-bottom: 2rem;
    }
`;

export const StyledWrapperSummary = styled.div `
    display: flex;
    justify-content: space-between;
    gap: 24px;

    div:first-child {
        background-color: black;

        p {
            color: #fff;
        }
    }

    @media (max-width: 770px) {
        flex-direction: column;
        gap: 12px;
    }
`;

export const StyledWrapperSummaryItem = styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 12px;
    background: #fff;
    border-radius: 12px;
    width: 100%;

    p:first-child {
        font-size: 0.8rem;
        color: #696868;
        padding-bottom: 0.5rem;
    }

    p:last-child {
        font-size: 2rem;
        color: black;
        font-weight: 600;
        letter-spacing: 2px;
    }
`;

export const StyledWrapperDetails = styled.div `
    margin-top: 3rem;
    display: flex;
    gap: 20px;

    @media (max-width: 990px) {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

export const StyledLeftSide = styled.div `
    display: grid;
    gap: 20px;
    width: 100%;
`;

export const StyledRightSide = styled.div `
    display: grid;
    gap: 20px;
    width: 100%;
`;


export const StyledWrapperPotsSection = styled.div `
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
`;

export const StyledWrapperBudgetsSection = styled.div `
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
`;

export const StyledWrapperTransactionsSection = styled.div `
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
`;

export const StyledWrapperBillsSection = styled.div `
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
`;

export const SectionHeader = styled.div `
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.8rem;

    a {
        border: none;
        background-color: transparent;
        color: #696868;
        text-decoration: none;
        transition: all 0.3s ease;
        &:hover {
            color: black;
            cursor: pointer;
        }

        img {
            padding-left: 1rem;
        }
    }
`;

export const StyledWrapperPotsSummary = styled.div `
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-top: 1rem;

    @media (max-width: 770px) {
        flex-direction: column;
        gap: 12px;
    }
`;

export const StyledWrapperTotalSaved = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: rgb(241, 239, 236);
    border-radius: 20px;
    width: 100%;
`;

export const PotsIconWrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
`;

export const ParagraphTotalSavedWrapper = styled.div `
    text-align: left;

    p {
        padding-left: 1rem;
    }

    p:first-child {
        font-size: 0.8rem;
        color: #696868;
        padding-bottom: 0.5rem;
    }

    p:last-child {
        font-size: 2rem;
        color: black;
        font-weight: 600;
        letter-spacing: 2px;
    }
`;

export const PotsListWrapper = styled.div `
    text-align: left;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 10px;
    width: 100%;

    p:first-child {
        font-size: 0.8rem;
        color: #696868;
        padding-bottom: 0.1rem;
    }

    p:last-child {
        font-size: 01rem;
        color: black;
        font-weight: 600;
        letter-spacing: 2px;
    }

    div {
        padding-left: 0.5rem;
    }

    div:nth-child(1) {
        border-left: 4px solid rgb(39, 124, 120);
    }

    div:nth-child(2) {
        border-left: 4px solid rgb(130, 201, 215);
    }

    div:nth-child(3) {
        border-left: 4px solid #4A5568;
    }

    div:nth-child(4) {
        border-left: 4px solid rgb(242, 205, 172);
    }
`;

export const BillsInfoWrapper = styled.div `
    margin-top: 2rem;

    div {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        background-color: rgb(241, 239, 236);
        padding: 1.5rem 1rem;
        margin-bottom: 1rem;
        border-radius: 10px;

        p:first-child {
            color: #696868;
        }

        p:last-child {
            color: black;
            font-weight: 600;
        }
    }

    div:nth-child(1) {
        border-left: 5px solid rgb(39, 124, 120);
    }

    div:nth-child(2) {
        border-left: 5px solid rgb(242, 205, 172);
    }

    div:nth-child(3) {
        border-left: 5px solid rgb(130, 201, 215);
    }
`;

export const BudgetAmountWrapper = styled.div `
    display: flex;

    @media (max-width: 1250px) {
        flex-direction: column;
    }
`;
