import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditModal from "@/src/components/Input/EditModal";
import ListItem from "@/src/components/List/ListItem";

describe("Edit modal integration tests", () => {
  it("Updates the data in the list item correctly", async () => {
    const sampleUser = {
      id: 1,
      name: "Aaron Miles",
      email: "aaron@mailinator.com",
      role: "member",
    };

    // mock data for the List component
    const props = {
      id: sampleUser.id,
      name: sampleUser.name,
      email: sampleUser.email,
      role: sampleUser.role,
      editSelectedUserObj: {},
      setEditSelectedUserObj: jest.fn(),
      handleEditSelectedUser: jest.fn(),
      deleteSelectedUsersArr: [],
      setDeleteSelectedUsersArr: jest.fn(),
      handleDeleteSelectedUsers: jest.fn(),
    };

    const { getByTestId, getByText } = render(
      <>
        <ListItem {...props} />
        <EditModal
          name={sampleUser.name}
          email={sampleUser.email}
          role={sampleUser.role}
          editSelectedUserObj={sampleUser}
          setEditSelectedUserObj={jest.fn()}
          handleEditSelectedUser={props.handleEditSelectedUser}
        />
      </>
    );

    const editButton = screen.getByTestId(`list-item-edit-${sampleUser.id}`);
    fireEvent.click(editButton);

    const nameInput = screen.getByLabelText(`Name`);
    const emailInput = screen.getByLabelText(`Email`);
    const roleSelect = screen.getByLabelText(`Role`);

    // Check if the input fields are present in the document
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(roleSelect).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "new name" } });
      fireEvent.change(emailInput, { target: { value: "new email" } });
      fireEvent.change(roleSelect, { target: { value: "admin" } });
    });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // check if the function has been called
    expect(props.handleEditSelectedUser).toHaveBeenCalled();

    // check the argument passed to the function
		// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		// ISSUE: FIX THIS
		// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		// For some reason, the onChange function on InputField components
		// is receiving the updated data, but is not passing it to the setEditSelectedUserObj
		// hence, our test is failing
		
		// But it works while using the app in browser and passes the manual review, SO..
    expect(props.handleEditSelectedUser).toHaveBeenCalledWith({
      id: 1,
      name: "new name",
      email: "new email",
      role: "admin",
    });

    const listItemName = screen.getByTestId(`list-item-name-${sampleUser.id}`);
    const listItemEmail = screen.getByTestId(`list-item-email-${sampleUser.id}`);
    const listItemRole = screen.getByTestId(`list-item-role-${sampleUser.id}`);

    // Check if list item with updated user details is being rendered on screen after Submit
    expect(listItemName).toHaveTextContent("new name");
    expect(listItemEmail).toHaveTextContent("new email");
    expect(listItemRole).toHaveTextContent("admin");
  });
});
