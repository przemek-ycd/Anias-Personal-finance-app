import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import {
  StyledWrapper,
  StyledWrapperTypography,
  StyledWrapperList,
  ButtonMinimizeMenu,
} from "./PersonalFinanceApp.styles";
import { Budgets } from "../components/Budgets/Budgets.tsx";
import { Transactions } from "../components/Transactions/Transactions.tsx";
import { RecurringBills } from "../components/RecurringBills/RecurringBills.tsx";
import { Overview } from "../components/Overview/Overview.tsx";
import { Pots } from "../components/Pots/Pots.tsx";

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

const PersonalFinanceApp = () => {
  const [open, setOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState("overview");

  const toggleMenu = () => {
    setOpen(!open);
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
      <Drawer
        sx={{
          width: open ? 0 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 250 : 100,
            transition: "width 0.3s",
            backgroundColor: "#201F24",
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
            color: "#fff",
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <StyledWrapperTypography>
          {open ? (
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-large.svg`}
              alt="Logo"
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-small.svg`}
              alt="Logo"
            />
          )}
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

        <IconButton
          onClick={toggleMenu}
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {open ? (
            <ButtonMinimizeMenu>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-caret-left.svg`}
                alt="Caret left"
              />
              Minimize Menu
            </ButtonMinimizeMenu>
          ) : (
            <ButtonMinimizeMenu>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-caret-right.svg`}
                alt="Caret right"
              />
            </ButtonMinimizeMenu>
          )}
        </IconButton>
      </Drawer>

      <div
        style={{
          marginLeft: open ? 240 : 80,
          padding: "20px",
          flexGrow: 1,
        }}
      >
        {SelectedComponent && <SelectedComponent />}
      </div>
    </StyledWrapper>
  );
};

export default PersonalFinanceApp;
