// This component renders the modal containing fields that can be edited for that user

import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import InputField from "./InputField";
import "tailwindcss/tailwind.css";

interface IProps {
  name: string;
  email: string;
  role: string;
  editSelectedUserObj: any;
  setEditSelectedUserObj: (obj: any) => void;
  handleEditSelectedUser: (obj: any) => void;
}

const EditModal: React.FC<IProps> = ({
  name,
  role,
  email,
  editSelectedUserObj,
  setEditSelectedUserObj,
  handleEditSelectedUser,
}) => {
  // error is a state-variable that is used to handle errors that may occur when typing input fields during the save process
  // The edit request will be successful only if error object is empty
  const [error, setError] = useState<any>({});

  useEffect(() => {
    setError({});
  }, [editSelectedUserObj]);

  return (
    <div
      className="w-[45%] md:w-[75%] sm:w-[85%] text-[black] flex flex-col items-center
			fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-[silver]
			shadow-2xl border border-[black] rounded"
    >
      {/* Shows the error message to be displayed after clicking on submit button if there is any */}
      {error.errorMsg != "" && (
        <div
          className="absolute text-[red] top-[-32px] left-[20px] font-bold text-lg sm:text-sm sm:left-0
				backdrop-filter backdrop-blur-sm"
          style={{ textShadow: "0 0 black" }}
        >
          {error.errorMsg}
        </div>
      )}

      <InputField
        label="Name"
        name="name"
        value={editSelectedUserObj.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEditSelectedUserObj({
            ...editSelectedUserObj,
            name: e.target.value,
          });
        }}
      />

      <InputField
        label="Email"
        name="email"
        value={editSelectedUserObj.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEditSelectedUserObj({
            ...editSelectedUserObj,
            email: e.target.value,
          });
        }}
      />

      <InputField
        label="Role"
        name="role"
        value={editSelectedUserObj.role}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEditSelectedUserObj({
            ...editSelectedUserObj,
            role: e.target.value,
          });
        }}
      />

      <div className="text-center justify-center w-[10%] flex">
        <div
          className="text-xl text-[white] bg-[#1890ff] border-[#1890ff] border-2 rounded
					rounded-full mb-4 mt-2 py-1 px-3 cursor-pointer hover:bg-opacity-90"
          onClick={() => {
            // Check if any field is empty
            if (
              editSelectedUserObj.role === "" ||
              editSelectedUserObj.email === "" ||
              editSelectedUserObj.name === ""
            ) {
              setError({ errorMsg: "* One or more fields are empty" });
            }

            // Check if name value entered has only string characters in it
            else if (!/^[a-zA-Z\s]+$/.test(editSelectedUserObj.name)) {
              setError({ errorMsg: "* Name can only have string characters" });
            }

            // Check if email value entered is a valid email format
            else if (
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editSelectedUserObj.email)
            ) {
              setError({ errorMsg: "* Please enter a valid email address" });
            }

            // Check if role value entered is either "admin" or "member"
            else if (
              editSelectedUserObj.role != "member" &&
              editSelectedUserObj.role != "admin"
            ) {
              setError({ errorMsg: "* User can only be admin or member!" });
            }

            // Save the changes
            else {
              handleEditSelectedUser(editSelectedUserObj);
            }
          }}
        >
          Submit
        </div>

        {/* Close the modal */}
        <CgClose
          className="text-[black] bg-[white] w-8 h-8 rounded rounded-[50%] absolute top-[-48px]
					shadow-xl right-2 z-50 p-1.5 text-2xl cursor-pointer"
          onClick={() => {
            setEditSelectedUserObj({});
          }}
        />
      </div>
    </div>
  );
};

export default EditModal;
