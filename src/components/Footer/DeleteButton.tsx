// This component renders the delete button at bottom left to trigger the delete function
// for multiple selected users, in the Footer section

import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import styles from "../../styles/Home.module.css";

interface IProps {
  onClick: () => void;
  disabled: boolean;
}

const DeleteButton: React.FC<IProps> = ({ onClick, disabled }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // This function provides our button knowledge of viewport
  // to switch to a truncated version of button when required
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button
      className={`fixed left-[70px] bottom-[8px]
      bg-[#fc0341] h-[35px] max-w-fit px-4 font-semibold 
      text-md rounded rounded-[32px] text-[white] 
      flex justify-center items-center md:left-[5px]
      ${
        disabled
          ? "cursor-default opacity-50"
          : "cursor-pointer hover:scale-110 ease-in duration-100"
      }
      transition ease-in duration-100 ${styles.app_footer}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isSmallScreen ? "Delete" : "Delete Selected"}
    </button>
  );
};

export default DeleteButton;
