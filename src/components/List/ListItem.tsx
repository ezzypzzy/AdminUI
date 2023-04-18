// This component contains the List item or Row containing the details & actions
// that can be performed on that item. These are Selecting, Editing and Deleting

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import "tailwindcss/tailwind.css";

import EditModal from "../Input/EditModal";
import CheckBox from "../Input/CheckBox";

interface IProps {
  id: number;
  name: string;
  email: string;
  role: string;
  editSelectedUserObj: any;
  setEditSelectedUserObj: any;
  handleEditSelectedUser: (obj: any) => void;
  deleteSelectedUsersArr: any;
  setDeleteSelectedUsersArr: any;
  handleDeleteSelectedUsers: (arr: any) => void;
}

const ListItem: React.FC<IProps> = ({
  id,
  name,
  email,
  role,
  editSelectedUserObj,
  setEditSelectedUserObj,
  handleEditSelectedUser,
  deleteSelectedUsersArr,
  setDeleteSelectedUsersArr,
  handleDeleteSelectedUsers,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.value);
    if (event.target.checked) {
      setDeleteSelectedUsersArr([...deleteSelectedUsersArr, id]);
    } else {
      setDeleteSelectedUsersArr(
        deleteSelectedUsersArr.filter((e: any) => e !== id)
      );
    }
  };

  return (
    <div
      className={`w-[100%] flex justify-center items-center border border-[silver] 
      border-b-1 border-l-0 border-r-0 border-t-0 mb-1 ease-in duration-100 relative
      ${deleteSelectedUsersArr.includes(Number(id)) && "bg-[silver]"}`}
      onClick={() => {
        editSelectedUserObj.id !== id && setEditSelectedUserObj({});
      }}
    >
      {/* Checkbox to select the List Item containing the selected user details */}
      <CheckBox
        value={id}
        checked={deleteSelectedUsersArr.includes(Number(id))}
        handleCheckboxChange={handleCheckboxChange}
      />

      {/* Component to render the row of user with details and action buttons to edit and delete */}
      <div
        className={`w-[55%] h-[50px] text-[black] flex justify-between items-center relative lg:w-[85%]`}
      >
        {editSelectedUserObj.id == id && (
          <EditModal
            {...{
              name,
              role,
              email,
              setEditSelectedUserObj,
              editSelectedUserObj,
              handleEditSelectedUser,
            }}
          />
        )}

        <div className="text-left w-[33%] overflow-clip mx-1.5">{name}</div>
        <div className="text-left w-[33%] overflow-clip mx-1.5">{email}</div>
        <div className="text-left w-[33%] capitalize">{role}</div>

        <div
          className="text-right w-[10%] flex"
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        >
          {/* Button to click and open the edit modal */}
          <FaRegEdit
            className="text-2xl mr-2 cursor-pointer hover:scale-125 ease-in duration-100"
            onClick={() => {
              setEditSelectedUserObj({ id, name, email, role });
            }}
          />

          {/* Button to delete the particular user */}
          <AiOutlineDelete
            className="text-[red] text-2xl cursor-pointer hover:scale-125 ease-in duration-100"
            onClick={() => {
              handleDeleteSelectedUsers([Number(id)]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
