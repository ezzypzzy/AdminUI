// This component renders the input search box to filter the users with role, name and email field

import React from "react";
import "tailwindcss/tailwind.css";

interface IProps {
  width: string;
  handleFilterData: (text: string) => void;
}

const SearchBox: React.FC<IProps> = ({ width, handleFilterData }) => {
  return (
    <div className={`border border-[black] w-[${width}] mb-1`}>
      <input
        className={`p-2 outline-0 w-[${width}]`}
        placeholder="Search by name, email or role"
        onChange={(e: any) => {
          handleFilterData(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBox;
