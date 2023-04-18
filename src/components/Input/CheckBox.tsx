// This component renders the checkbox element for the list items
// Selecting the checkbox, adds the user to the deleteSelectedUsersArr state-variable
// to be prepared for deletion

import React from "react";
import "tailwindcss/tailwind.css";

interface IProps {
  value: number;
  checked: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<IProps> = ({ value, checked, handleCheckboxChange }) => (
  <input
    type="checkbox"
    value={value}
    checked={checked}
    className="absolute left-[30px] md:left-0 sm:left-2 sm:md:left-2 top-[15px] w-[20px] h-[20px] border border-[silver] cursor-pointer"
    onChange={handleCheckboxChange}
  />
);

export default CheckBox;