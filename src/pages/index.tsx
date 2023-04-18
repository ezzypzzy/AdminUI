import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "tailwindcss/tailwind.css";
import styles from "../styles/Home.module.css";

import List from "../components/List/index";
import Pagination from "../components/Footer/Pagination";
import DeleteButton from "../components/Footer/DeleteButton";

export default function Home() {
  // state-variable userData is used to hold the data of the users fetched from the provided API
  // i.e., "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  const [userData, setUserData] = useState([]);

  // persistingData state-variable is used  to keep track of any changes made to the users' data in the UI,
  // including editing and deleting, which will not persist beyond the user's session.
  const [persistingData, setPersistingData] = useState([]);

  // currentPage state-variable is used to keep track of the currently selected page number in the pagination component
  // Other functions include -
  // Handling the range of multiple selected users for deletion
  // Applying conditional styling to the pagination buttons based on the currently selected page number
  // Initial state is set so that first page will be selected by default when the component is loaded
  const [currentPage, setCurrentPage] = useState(1);

  // itemsPerPage is defined as a state-variable so that it can be changed in the future easily
  // without having to keep track and change code in multiple places
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // editSelectedUserObj state-variable stores the data of the user that the user wants to edit
  const [editSelectedUserObj, setEditSelectedUserObj] = useState({});

  // deleteSelectedUsersArr state variable is used to keep track of the multiple users
  // which are selected to be deleted in a single click of the delete button at the left-bottom.
  const [deleteSelectedUsersArr, setDeleteSelectedUsersArr] = useState<any>([]);

  // fetchJson function is used to get data from geektrust API and store the data in userData setState
  const fetchJson = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = response.data;
      if (data.length > 0) {
        setUserData(data);
        setPersistingData(data);
        // useEffect hook with fetchJson as a dependency is called once the component mounts
        // and also when the currentPage changes (Toast is showing two times --> FIX THIS)
        // toast.info('Users loaded from geektrust API');
        console.log('The 404 error above is caused by importing google fonts and is of no concern to the functionality of the project');
      }
    } catch (e: unknown) {
      console.log((e as Error).message);
      toast.error('An error occurred while fetching data');
    }
  };

  // Calls fetchJson function as soon as the document loads on the browser.
  useEffect(() => {
    fetchJson();
  }, []);

  // Clears the array of selected users to be deleted whenever a new page is selected using pagination buttons.
  useEffect(() => {
    setDeleteSelectedUsersArr([]);
  }, [currentPage]);

  // handleFilterData function filters the userData list based on the text entered by the user in an input box
  // userData list based on the text entered by the user in an input box, in a case-insensitive basis
  const handleFilterData = (text: string) => {
    setCurrentPage(1);
    setPersistingData(
      userData.filter((e: any, i: number) => {
        return (
          e.name.toLowerCase().includes(text.toLocaleLowerCase()) ||
          e.role.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
          e.email.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        );
      })
    );
  };

  // handleDeleteSelectedUsers function is used to delete the array of selected users
  const handleDeleteSelectedUsers = (arr: any) => {
    setPersistingData(
      persistingData.filter((e: any) => {
        return !arr.includes(Number(e.id));
      })
    );
    setUserData(
      userData.filter((e: any) => {
        return !arr.includes(Number(e.id));
      })
    );

    setDeleteSelectedUsersArr([]);
    toast.error(`Deleted ${arr.length} ${arr.length > 1 ? 'users' : 'user'}`);
  };

  // handleEditSelectedUser is used to edit the selected user
  const handleEditSelectedUser = (obj: any) => {
    const originalUser = persistingData.find((x: any) => x.id === obj.id);
    const updatedUserData: any = persistingData.map((x: any) =>
      x.id === obj.id ? { ...obj } : x
    );
    setPersistingData(updatedUserData);
    setUserData(updatedUserData);

    const changedProperties = getChangedProperties(originalUser, obj);
    setEditSelectedUserObj({});

    const message = `Updated ${changedProperties.join(', ')} for ${obj.name}`;
    toast.success(message);
  };

  // This function compares the the original object with the updated object
  // to identify the changed properties of the handleEditSelectedUser
  function getChangedProperties(original: any, updated: any): string[] {
    const changedProperties: string[] = [];
    for (const key in updated) {
      if (original[key] !== updated[key]) {
        changedProperties.push(key);
      }
    }
    return changedProperties;
  }  

  // last_item_index, first_item_index and current_items are the non-state-variables used for pagination
  const last_item_index = currentPage * itemsPerPage;
  const first_item_index = last_item_index - itemsPerPage;
  // current_items is the subarray of users to be displayed on the current page
  const current_items = persistingData.slice(first_item_index, last_item_index);

  // paginate function is called after selecting a page from the pagination buttons
  // It shows the persisting users' data as per the page selected
  const paginate = (num: number) => {
    setCurrentPage(num);
  };

  // previousPage function is used to handle the click event of the "previous" button
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // nextPage function is used to handle the click event of the "next" button
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Head>
        <title>ADMIN UI</title>
        <meta name="description" content="Geektrust frontend assignment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          @import url(&apos;https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap&apos;);
        </style>
      </Head>

      <ToastContainer />
      <div className="relative overflow-hidden">
        <div className="relative w-full">
          <div className={styles.app_list_container}>
            <List
              showData={current_items}
              fetchJson={handleFilterData}
              handleDeleteSelectedUsers={handleDeleteSelectedUsers}
              deleteSelectedUsersArr={deleteSelectedUsersArr}
              handleEditSelectedUser={handleEditSelectedUser}
              setDeleteSelectedUsersArr={setDeleteSelectedUsersArr}
              editSelectedUserObj={editSelectedUserObj}
              setEditSelectedUserObj={setEditSelectedUserObj}
            />
          </div>

          <Pagination
            width="100%"
            itemsPerPage={itemsPerPage}
            totalItems={persistingData.length}
            paginate={paginate}
            currentPage={currentPage}
            previousPage={previousPage}
            nextPage={nextPage}
          />
          <DeleteButton
            onClick={() => handleDeleteSelectedUsers(deleteSelectedUsersArr)}
            disabled={deleteSelectedUsersArr.length === 0}
          />
        </div>
      </div>
    </>
  );
}
