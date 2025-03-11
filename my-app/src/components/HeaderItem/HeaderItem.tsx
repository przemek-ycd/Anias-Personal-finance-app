import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { removeBudget, editBudget } from "../../store/data.ts";
import { SectionHeader, Dot } from "./HeaderItem.styles.js";
import { Menu, MenuItem, Button } from "@mui/material";
import { CustomDialog } from "../CustomDialog/CustomDialog.tsx";

interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

interface HeaderItemProps {
  title: string;
  data: Budget;
  category: string;
}

export const HeaderItem: FC<HeaderItemProps> = ({ title, data, category }) => {
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [formData, setFormData] = useState({
    categoryName: data.category,
    targetAmount: data.maximum,
    themeColor: data.theme,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (name: string) => {
    dispatch(removeBudget(name));
  };

  const handleEditSubmit = () => {
    dispatch(
      editBudget({
        category: category,
        newName: formData.categoryName,
        newTarget: formData.targetAmount,
        color: formData.themeColor,
      })
    );
    setIsEditDialogOpen(false);
  };

  return (
    <SectionHeader>
      <p>
        <Dot />
        {data.category}
      </p>
      <Button onClick={handleClick}>
        <img
          src={`${process.env.PUBLIC_URL}/images/icon-ellipsis.svg`}
          alt="Icon ellipsis"
        />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => setIsEditDialogOpen(true)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(data.category)}>Delete</MenuItem>
      </Menu>
      <CustomDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title={`Edit ${title}`}
        description={`If your saving targets change, feel free to update your ${title}s.`}
        formData={formData}
        setFormData={setFormData}
        onSave={handleEditSubmit}
      />
    </SectionHeader>
  );
};
