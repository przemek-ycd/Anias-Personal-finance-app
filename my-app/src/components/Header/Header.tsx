import React, { FC, useState } from "react";
import { SectionHeader } from "./Header.styles.js";
import { useDispatch } from "react-redux";
import { addBudget, addPot } from "../../store/data.ts";
import { CustomDialog } from "../CustomDialog/CustomDialog.tsx";

interface HeaderProps {
  title: string;
  type: "budget" | "pot";
}

interface FormData {
  newName: string;
  newTarget: number;
  color: string;
}

export const Header: FC<HeaderProps> = ({ title, type }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const config = {
    budget: {
      initialState: { newName: "", newTarget: 0, color: "" },
      action: (formData: FormData) =>
        dispatch(
          addBudget({
            category: formData.newName,
            maximum: formData.newTarget,
            theme: formData.color,
          })
        ),
    },
    pot: {
      initialState: { newName: "", newTarget: 0, color: "" },
      action: (formData: FormData) =>
        dispatch(
          addPot({
            name: formData.newName,
            target: formData.newTarget,
            total: 0,
            theme: formData.color,
          })
        ),
    },
  };

  const [formData, setFormData] = useState(config[type].initialState);

  const handleSave = () => {
    config[type].action(formData);
    setIsDialogOpen(false);
    setFormData(config[type].initialState);
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
        onSave={setFormData}
        onSaveButton={handleSave}
      />
    </>
  );
};

export default Header;
