import styled from 'styled-components';

export const StyledWrapperTransactionsDetails = styled.div `
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgb(226, 224, 224);

    &:last-child {
        border-bottom: none;
    }
`;

export const TransactionsNameWrapper = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    img{
        margin-right: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%
    }
`;

export const TransactionsAdditionalInfoWrapper = styled.div `
    p:first-child {
        font-size: 1rem;
        font-weight: 600;
        padding-bottom: 0.5rem;
    }

    p:last-child {
        font-size: 0.8rem;
        color: #696868;
    }
`;
