// This component renders the input fields for the Edit Modal

import React from "react";
import "tailwindcss/tailwind.css";

interface IInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<IInputProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <label htmlFor={name} className="text-left text-[gray] w-[80%] mt-2">{label}</label>
      <input
        id={name}
        className="text-left w-[80%] rounded rounded-[0.5rem] p-1 outline-none border-2 pl-4 mr-2 mb-2 mt-1"
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputField;
