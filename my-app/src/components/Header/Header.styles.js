import styled from 'styled-components';

export const SectionHeader = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    button {
        border: none;
        border-radius: 10px;
        background-color: black;
        color: #fff;
        padding: 1rem;
        font-weight: 700;
        transition: all 0.3s ease;
        &:hover {
            background-color: #696868;
            cursor: pointer;
        }
    }
`;