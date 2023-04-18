// This component renders the delete button at bottom left to trigger the delete function
// for multiple selected users, in the Footer section

import React from "react";
import "tailwindcss/tailwind.css";
import styles from "../../styles/Home.module.css";

interface IProps {
  onClick: () => void;
  disabled: boolean;
}

const DeleteButton: React.FC<IProps> = ({ onClick, disabled }) => {
  return (
    <button
      className={`fixed left-[70px] bottom-[8px] 
      bg-[#fc0341] h-[35px] w-[150px] font-semibold 
      text-md rounded rounded-[32px] text-[white] 
        flex justify-center items-center md:left-[5px]
        ${
          disabled
            ? "cursor-default opacity-50"
            : "cursor-pointer hover:scale-110 ease-in duration-100"
        }
        transition duration-200 ease-in-out ${styles.app_footer}`}
      onClick={onClick}
      disabled={disabled}
    >
      Delete Selected
    </button>
  );
};

export default DeleteButton;
