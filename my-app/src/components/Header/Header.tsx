import React, { FC, useState } from "react";
import { SectionHeader } from "./Header.styles.js";
import { useDispatch } from "react-redux";
import { addBudget } from "../../store/data.ts";
import { CustomDialog } from "../CustomDialog/Dialog.tsx";

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: "",
    targetAmount: 0,
    themeColor: "",
  });

  const handleSave = () => {
    dispatch(
      addBudget({
        category: formData.categoryName,
        maximum: formData.targetAmount,
        theme: formData.themeColor,
      })
    );
    setIsDialogOpen(false);
    setFormData({ categoryName: "", targetAmount: 0, themeColor: "" });
  };

  return (
    <>
      <SectionHeader>
        <h1>{title}s</h1>
        <button onClick={() => setIsDialogOpen(true)}>+ Add New {title}</button>
      </SectionHeader>
      <CustomDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`Add New ${title}`}
        description={`Create a ${title} to set savings targets`}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </>
  );
};

export default Header;
