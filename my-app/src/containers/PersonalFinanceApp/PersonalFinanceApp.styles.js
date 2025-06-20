import { Drawer, IconButton } from "@mui/material";
import styled from 'styled-components';

export const StyledWrapper = styled.div `
    display: flex;
`;

export const StyledWrapperTypography = styled.div `
    margin-bottom: 2rem;
    padding: 3rem;

    @media (max-width: 1100px) {
        margin: 0;
        padding: 0;
        margin-right: 50px;
    }

    @media (max-width: 660px) {
        display: none;
    }
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

    @media (max-width: 1100px) {
        display: none;
    }
`;

export const StyledWrapperList = styled.div `
    button {
        display: flex;
        justify-content: left;
        align-items: center;
        text-align: center;
        padding: 1rem;
        width: 100%;
        background-color: transparent;
        color: #B3B3B3;
        border: none;
        font-size: 1.2rem;
        margin: 1rem;
        margin-left: 0;
        transition: all 0.3s ease;
        border-left: 6px solid transparent;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;

        &:hover {
            color: #201f24;
            cursor: pointer;
            background-color: #fff;
            border-left: 6px solid rgb(8, 112, 112);

            img {
                filter: invert(25%) sepia(15%) saturate(1000%) hue-rotate(124deg);
            }
        }

        img {
            margin-right: 1rem;
        }

        @media (max-width: 1100px) {
            border-left: 0;
            border-top: 6px solid transparent;
            border-top-right-radius: 0;
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
            justify-content: center;

            &:hover {
                border-left: 0;
                border-top: 6px solid rgb(8, 112, 112);
            }

            img {
                margin: 0 0.5rem;
            }
        }
    }

    div {
        a {
            text-decoration: none;
        }
    }

    @media (max-width: 1100px) {
        display: flex;
        flex-direction: row;
        padding: 0;
        margin: 0;

        p {
            display:none;
        }
    }
`;

export const StyledDrawer = styled(Drawer)`
    & .MuiDrawer-paper {
        width: ${(props) => (props.open ? "250px" : "100px")};
        transition: width 0.3s;
        background-color: #201f24;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        color: #fff;
        visibility: visible !important;
        padding-right: 5px;
        transform: translateX(0) !important; 

        @media (max-width: 1100px) {
            width: 100%;
            height: 95px;
            border-radius: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
        }
    }
`;

export const ContentWrapper = styled.div`
    margin-left: ${(props) => (props.open ? "240px" : "80px")};
    padding: 20px;
    flex-grow: 1;

    @media (max-width: 1100px) {
        margin-top: 120px;
        margin-left: 0;
    }
`
;

export const StyledIconButton = styled(IconButton)`
    margin-top: 2rem;
`
;

export const StyledWrapperNews = styled.div `
    display: flex;
    position: fixed;
    bottom: 0;
    height: 40;
    width: 100%;
    overflow: hidden;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid rgb(241, 239, 236);
`;