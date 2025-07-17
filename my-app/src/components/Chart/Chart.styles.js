import styled from 'styled-components';

export const StyledWrapperChartItems = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;

    &:not(:last-child) {
        border-bottom: 1px solid rgb(241, 239, 236);
    }

    p {
        font-size: 0.9rem;
        color: #696868;
        font-weight: 400;
        padding: 0.5rem;
    }
`;

export const ParagraphAmount = styled.div `
    display: flex;
        justify-content: center;
    align-items: center;
    text-align: center;

    p:first-child{
        font-size: 0.9rem;
        font-weight: 600;
        color: black;
        padding: 0 5px;
    }

    p:last-child {
        padding: 0;
    }
`;
