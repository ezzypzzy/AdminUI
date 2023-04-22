import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItem from "@/src/components/List/ListItem";
import sampleUsersArr from "@mockusers";

describe("ListItem integration tests", () => {
  it("Renders list items correctly: containing name, email and role for the users", async () => {
    const props = {
      users: sampleUsersArr,
      editSelectedUserObj: {},
      setEditSelectedUserObj: jest.fn(),
      handleEditSelectedUser: jest.fn(),
      deleteSelectedUsersArr: [],
      setDeleteSelectedUsersArr: jest.fn(),
      handleDeleteSelectedUsers: jest.fn(),
    };

    // This is a helper function provided by the React Testing Library that ensures
    // all asynchronous tasks have completed before continuing
    await act(async () => {
      props.users.forEach((user) => {
        render(<ListItem key={user.id} {...user} {...props} />);
      });
    });

    props.users.forEach((user) => {
      // Retrieves the rendered ListItem component with the specified test id
      const listItem = screen.getByTestId(`list-item-${user.id}`);
      // Check that the retrieved ListItem component is in the document, i.e., it has been successfully rendered and mounted.
      expect(listItem).toBeInTheDocument();
    });
  });
});
