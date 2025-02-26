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
    gap: 30px;

    
    @media (max-width: 990px) {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

export const StyledWrapperDetailsHeader = styled.div `
    width: 60%;

    @media (max-width: 990px) {
        width: 100%;
    }
`;

export const TotalBills = styled.div `
    border-radius: 20px;
    padding: 2rem;
    background-color: black;
    margin-bottom: 30px;

    img{
        padding-bottom: 2rem;
    }

    p {
        color: #fff;
        padding-bottom: 1rem;

        &:first-child {
            font-size: 0.8rem;
        }

        &:last-child {
            font-size: 2rem;
            font-weight: 600;
        }
    }

`;

export const SummaryBills = styled.div `
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;

    h3 {
        padding-bottom: 2rem;
    }
`;

export const StyledSummaryBillsItem = styled.div `
    display: flex;
    justify-content: space-between;
    gap: 100px;
    padding: 1rem 0;
    margin-bottom: 1rem;
    &:not(:last-child) {
        border-bottom: 1px solid rgb(241, 239, 236);
        p {
            &:first-child {
                color: #696868;
            }

            &:last-child {
                color: black;
            }
        }
    }

        p {
            color: #c94736;
            &:last-child {
                font-weight: 600;
            }
        }
`;

export const BillsWrapper = styled.div `
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    div {
        display: flex;
        justify-content: left;
        gap: 24px;
    }
`;

export const WrapperImage = styled.div `
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 12px;

    img{
        margin-right: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%
    }

    p {
        font-weight: 700;
        padding-bottom: 10px;
    }
`;

export const IconBill = styled.img `
    margin-left: 5px;
`;