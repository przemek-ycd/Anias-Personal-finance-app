import React, { FC } from "react";
import { SectionHeader } from "./Header.styles.js";

interface HeaderProps {
  title: string;
  onOpen: () => void;
}

export const Header: FC<HeaderProps> = ({ title, onOpen }) => {
  return (
    <>
      <SectionHeader>
        <h1>{title}s</h1>
        <button onClick={onOpen}>+ Add New {title}</button>
      </SectionHeader>
    </>
  );
};

export default Header;
