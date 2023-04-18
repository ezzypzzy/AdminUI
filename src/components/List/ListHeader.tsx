// This component renders the List header with the checkbox to select all fields
// displayed currently on the page

import React from "react";
import "tailwindcss/tailwind.css";
import CheckBox from "../Input/CheckBox";

interface IProps {
  showData: any;
  deleteSelectedUsersArr: any;
  setDeleteSelectedUsersArr: any;
}

const ListHeader: React.FC<IProps> = ({
  showData,
  deleteSelectedUsersArr,
  setDeleteSelectedUsersArr,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    if (checked) {
      setDeleteSelectedUsersArr([...deleteSelectedUsersArr, Number(value)]);
    } else {
      setDeleteSelectedUsersArr(deleteSelectedUsersArr.filter((id: number) => id !== Number(value)));
    }
  };

  return (
    <div
      className="w-[100%] h-[50px] flex justify-center items-center relative border border-[silver] border-b-1 border-l-0 border-r-0 border-t-0"
    >
      <div className={`w-[10%]`}>
        <CheckBox
          value={0}
          checked={deleteSelectedUsersArr.length === showData.length}
          handleCheckboxChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            deleteSelectedUsersArr.length === showData.length
              ? setDeleteSelectedUsersArr([])
              : setDeleteSelectedUsersArr(showData.map((e: any) => Number(e.id)));
          }}
        />
      </div>

      <div className="w-[90%] text-[black] flex justify-between items-center relative font-black">
        <div className="text-left w-[30%]">Name</div>
        <div className="text-left w-[30%] sm:w-[40%]">Email</div>
        <div className="text-left w-[30%] sm:w-[20%]">Role</div>
        <div className="text-left w-[10%] min-w-[56px]">Actions</div>
      </div>
    </div>
  );
};

export default ListHeader;