import React, { SetStateAction } from "react";
import "tailwindcss/tailwind.css";

import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import { SearchBox } from "..";

interface IProps {
  showData: any;
  fetchJson: (text: string) => void;
  handleDeleteSelectedUsers: (arr: any) => void;
  handleEditSelectedUser: (obj: any) => void;
  deleteSelectedUsersArr: any;
  setDeleteSelectedUsersArr: React.Dispatch<SetStateAction<any>>;
  editSelectedUserObj: any;
  setEditSelectedUserObj: React.Dispatch<SetStateAction<any>>;
}

const List: React.FC<IProps> = ({
  showData,
  fetchJson,
  handleDeleteSelectedUsers,
  handleEditSelectedUser,
  deleteSelectedUsersArr,
  setDeleteSelectedUsersArr,
  editSelectedUserObj,
  setEditSelectedUserObj,
}) => {
  return (
    <div className="w-[100%] mt-[10px] flex flex-col items-center justify-center border-0">
      <SearchBox width="100%" handleFilterData={fetchJson} />

      <ListHeader
        showData={showData}
        deleteSelectedUsersArr={deleteSelectedUsersArr}
        setDeleteSelectedUsersArr={setDeleteSelectedUsersArr}
      />

      {/* if there is no data left on the page after deletion, show this message instead */}
      {showData.length == 0 && (
        <div className="mt-4 text-lg font-semibold">Nothing to see here :)</div>
      )}

      {/* Render all the user list items on the current page as per the pagination */}
      {showData.map((e: any) => (
        <ListItem
          key={e.id}
          id={e.id}
          name={e.name}
          email={e.email}
          role={e.role}
          deleteSelectedUsersArr={deleteSelectedUsersArr}
          setDeleteSelectedUsersArr={setDeleteSelectedUsersArr}
          handleDeleteSelectedUsers={handleDeleteSelectedUsers}
          handleEditSelectedUser={handleEditSelectedUser}
          editSelectedUserObj={editSelectedUserObj}
          setEditSelectedUserObj={setEditSelectedUserObj}
        />
      ))}
    </div>
  );
};

export default List;
