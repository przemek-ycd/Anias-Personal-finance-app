import styled from 'styled-components';

export const StyledWrapperDialog = styled.div `
    padding: 2rem;
    min-width: 500px;

    p {
        font-size: 0.9rem;
        color: #696868;
        margin-bottom: 2rem;
    }

    div {
        margin-bottom: 0.5rem;
    }
`;

export const SectionHeaderDialog = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;

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
        margin-top: -15%;
        margin-right: -3%;
        transition: all 0.3s ease;
        &:hover {
            cursor: pointer;
            color: #fff;
            background-color: black;
        }
    }
`;

export const ButtonSave = styled.button `
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