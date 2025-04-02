import React, { FC, useState } from "react";
import { SectionHeader, Dot } from "./HeaderItem.styles.js";
import { Menu, MenuItem, Button } from "@mui/material";

interface HeaderItemProps {
  name: string;
  color: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const HeaderItem: FC<HeaderItemProps> = ({
  color,
  name,
  onEdit,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <SectionHeader>
      <p>
        <Dot theme={color} />
        {name}
      </p>
      <Button onClick={handleClick}>
        <img
          src={`${process.env.PUBLIC_URL}/images/icon-ellipsis.svg`}
          alt="Icon ellipsis"
        />
      </Button>
      <Menu open={isMenuOpen} onClose={handleClose}>
        <MenuItem onClick={onEdit}>Edit</MenuItem>
        <MenuItem onClick={onDelete}>Delete</MenuItem>
      </Menu>
    </SectionHeader>
  );
};
