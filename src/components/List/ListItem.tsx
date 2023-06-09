// This component contains the List item or Row containing the details & actions
// that can be performed on that item. These are Selecting, Editing and Deleting

import React, { useEffect, useState } from "react";
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // This function provides our List Item (role) knowledge of viewport
  // to switch to a abbreviated version of role when required
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
      data-testid={`list-item-${id}`}
      id={`list-item-${id}`}
      className={`w-[100%] flex justify-center items-center border border-[silver] 
      border-b-1 border-l-0 border-r-0 border-t-0 mb-1 ease-in duration-100 relative
      ${deleteSelectedUsersArr.includes(Number(id)) && "bg-[silver]"}`}
      onClick={() => {
        editSelectedUserObj.id !== id && setEditSelectedUserObj({});
      }}
    >
      <div className={`w-[10%]`}>
        {/* Checkbox to select the List Item containing the selected user details */}
        <CheckBox
          value={id}
          checked={deleteSelectedUsersArr.includes(Number(id))}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>

      {/* Component to render the row of user with details and action buttons to edit and delete */}
      <div
        className={`w-[90%] h-[50px] text-[black] flex justify-between items-center relative`}
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

        <div
          data-testid={`list-item-name-${id}`}
          className="text-left w-[30%] max-h-[50px] break-words border-r-8 border-transparent overflow-hidden"
        >
          {name}
        </div>
        <div
          data-testid={`list-item-email-${id}`}
          className="text-left w-[30%] max-h-[50px] sm:w-[40%] break-words border-r-8 border-transparent"
        >
          {email}
        </div>
        <div
          data-testid={`list-item-role-${id}`}
          className="text-left w-[30%] max-h-[50px] sm:w-[20%] overflow-clip capitalize border-r-8 border-transparent"
        >
          {isSmallScreen ? (role === "admin" ? "ADM" : "MBR") : role}
        </div>

        <div
          className="text-left w-[10%] min-w-[56px] pr-2 flex"
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        >
          {/* Button to click and open the edit modal */}
          <FaRegEdit
            data-testid={`list-item-edit-${id}`}
            className="text-2xl mr-2 cursor-pointer hover:scale-125 ease-in duration-100"
            onClick={() => {
              setEditSelectedUserObj({ id, name, email, role });
            }}
          />

          {/* Button to delete the particular user */}
          <AiOutlineDelete
            data-testid={`list-item-delete-${id}`}
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
