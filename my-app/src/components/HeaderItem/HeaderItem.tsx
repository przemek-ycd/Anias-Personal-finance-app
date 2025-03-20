import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeBudget,
  editBudget,
  removePot,
  editPot,
} from "../../store/data.ts";
import { SectionHeader, Dot } from "./HeaderItem.styles.js";
import { Menu, MenuItem, Button } from "@mui/material";
import { CustomDialog } from "../CustomDialog/CustomDialog.tsx";

interface FormData {
  newName: string;
  newTarget: number;
  color: string;
}

interface BudgetData {
  category: string;
  maximum: number;
  theme: string;
}

interface PotsData {
  name: string;
  target: number;
  theme: string;
}

interface HeaderItemProps {
  title: string;
  data: BudgetData | PotsData;
  name: string;
  type: "budget" | "pot";
}

export const HeaderItem: FC<HeaderItemProps> = ({
  title,
  data,
  name,
  type,
}) => {
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const config = {
    budget: {
      initialState: {
        newName: data.category,
        newTarget: data.maximum,
        color: data.theme,
      },
      actionEdit: (formData: FormData) =>
        dispatch(
          editBudget({
            category: name,
            newName: formData.newName,
            newTarget: formData.newTarget,
            color: formData.color,
          })
        ),
      actionRemove: (name: string) => dispatch(removeBudget(name)),
    },
    pot: {
      initialState: {
        name: data.name,
        newName: data.name,
        newTarget: data.target,
        color: data.theme,
      },
      actionEdit: (formData: FormData) =>
        dispatch(
          editPot({
            name: name,
            newName: formData.newName,
            newTarget: formData.newTarget,
            color: formData.color,
          })
        ),
      actionRemove: (name: string) => dispatch(removePot(name)),
    },
  };

  const [formData, setFormData] = useState(config[type].initialState);

  const handleClick = () => {
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    config[type].actionRemove(name);
  };

  const handleEditSubmit = () => {
    config[type].actionEdit(formData);
    setIsEditDialogOpen(false);
  };

  return (
    <SectionHeader>
      <p>
        <Dot theme={data.theme} />
        {data.name}
      </p>
      <Button onClick={handleClick}>
        <img
          src={`${process.env.PUBLIC_URL}/images/icon-ellipsis.svg`}
          alt="Icon ellipsis"
        />
      </Button>
      <Menu open={isMenuOpen} onClose={handleClose}>
        <MenuItem onClick={() => setIsEditDialogOpen(true)}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <CustomDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title={`Edit ${title}`}
        description={`If your saving targets change, feel free to update your ${title}s.`}
        formData={formData}
        onSave={setFormData}
        onSaveButton={handleEditSubmit}
      />
    </SectionHeader>
  );
};
