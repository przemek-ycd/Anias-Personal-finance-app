import React, { useState } from "react";
import {
  StyledWrapper,
  StyledWrapperTypography,
  StyledWrapperList,
  ButtonMinimizeMenu,
  StyledDrawer,
  ContentWrapper,
  StyledIconButton,
  StyledWrapperNews,
} from "./PersonalFinanceApp.styles.js";
import { Budgets } from "../../components/Budgets/Budgets.tsx";
import { Transactions } from "../../components/Transactions/Transactions.tsx";
import { RecurringBills } from "../../components/RecurringBills/RecurringBills.tsx";
import { Overview } from "../Overview/Overview.tsx";
import { Pots } from "../../components/Pots/Pots.tsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { NewsTicker } from "../../components/NewsTicker/NewsTicker.tsx";

const menuItems = {
  overview: {
    text: "Overview",
    image: "icon-nav-overview",
    description: "Icon overview",
  },
  transactions: {
    text: "Transactions",
    image: "icon-nav-transactions",
    description: "Icon transactions",
  },
  budgets: {
    text: "Budgets",
    image: "icon-nav-budgets",
    description: "Icon budgets",
  },
  pots: {
    text: "Pots",
    image: "icon-nav-pots",
    description: "Icon pots",
  },
  recurringBills: {
    text: "Recurring Bills",
    image: "icon-nav-recurring-bills",
    description: "Icon recurring bills",
  },
};

const LogoImg = ({ size }) => (
  <img src={`${process.env.PUBLIC_URL}/images/logo-${size}.svg`} alt="Logo" />
);

const IconCaretImg = ({ direction }) => (
  <img
    src={`${process.env.PUBLIC_URL}/images/icon-caret-${direction}.svg`}
    alt={`Caret ${direction}`}
  />
);

const PersonalFinanceApp = () => {
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Router>
      <StyledWrapper>
        <StyledDrawer variant="persistent" anchor="left" open={open}>
          <StyledWrapperTypography>
            <LogoImg size={open ? "large" : "small"} />
          </StyledWrapperTypography>

          <StyledWrapperList>
            {Object.keys(menuItems).map((key) => {
              const { text, image, description } = menuItems[key];
              return (
                <div key={key}>
                  <Link to={`/${key}`}>
                    <button data-testid={`menu-item-${key}`}>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/${image}.svg`}
                        alt={description}
                        style={{ width: 24, height: 24 }}
                      />
                      {open && <p>{text}</p>}
                    </button>
                  </Link>
                </div>
              );
            })}
          </StyledWrapperList>

          <StyledIconButton
            onClick={toggleMenu}
            aria-label="menu-toggle-button"
          >
            {open ? (
              <ButtonMinimizeMenu>
                <IconCaretImg direction={"left"} />
                Minimize Menu
              </ButtonMinimizeMenu>
            ) : (
              <ButtonMinimizeMenu>
                <IconCaretImg direction={"right"} />
              </ButtonMinimizeMenu>
            )}
          </StyledIconButton>
        </StyledDrawer>

        <ContentWrapper open={open}>
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/pots" element={<Pots />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/recurringBills" element={<RecurringBills />} />
            <Route path="/*" element={<div>Page not found</div>} />
          </Routes>
        </ContentWrapper>
        <StyledWrapperNews>
          <NewsTicker />
        </StyledWrapperNews>
      </StyledWrapper>
    </Router>
  );
};

export default PersonalFinanceApp;
