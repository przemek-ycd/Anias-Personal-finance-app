import React, { useState } from "react";
import {
  StyledWrapper,
  StyledWrapperTypography,
  StyledWrapperList,
  ButtonMinimizeMenu,
  StyledDrawer,
  ContentWrapper,
  StyledIconButton,
} from "./PersonalFinanceApp.styles.js";
import { Budgets } from "../../components/Budgets/Budgets.tsx";
import { Transactions } from "../../components/Transactions/Transactions.tsx";
import { RecurringBills } from "../../components/RecurringBills/RecurringBills.tsx";
import { Overview } from "../Overview/Overview.tsx";
import { Pots } from "../../components/Pots/Pots.tsx";

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

type SelectedComponent =
  | "overview"
  | "transactions"
  | "budgets"
  | "pots"
  | "recurringBills";

const PersonalFinanceApp = () => {
  const [open, setOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] =
    useState<SelectedComponent>("overview");

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleItemClick = (component: string) => {
    setSelectedComponent(component);
  };

  const components = {
    overview: Overview,
    pots: Pots,
    budgets: Budgets,
    transactions: Transactions,
    recurringBills: RecurringBills,
  };

  const SelectedComponent = selectedComponent
    ? components[selectedComponent]
    : null;

  return (
    <StyledWrapper>
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <StyledWrapperTypography>
          {open ? <LogoImg size={"large"} /> : <LogoImg size={"small"} />}
        </StyledWrapperTypography>

        <StyledWrapperList>
          {Object.keys(menuItems).map((key) => {
            const { text, image, description } = menuItems[key];
            return (
              <div key={key}>
                <button onClick={() => handleItemClick(key)}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${image}.svg`}
                    alt={description}
                    style={{ width: 24, height: 24 }}
                  />
                  {open && <p>{text}</p>}
                </button>
              </div>
            );
          })}
        </StyledWrapperList>

        <StyledIconButton onClick={toggleMenu}>
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
        <SelectedComponent />
      </ContentWrapper>
    </StyledWrapper>
  );
};

export default PersonalFinanceApp;
