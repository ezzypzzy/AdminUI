import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBox from "@/src/components/Input/SearchBox";
import ListItem from "@/src/components/List/ListItem";
import sampleUsersArr from "@mockusers";

describe("SearchBox integration tests", () => {
  it("Should filter users based on search query", () => {
    const handleFilterData = jest.fn();
    const props = {
      userData: sampleUsersArr,
      width: "100%",
      handleFilterData,
    };

    // Render the SearchBox component as well as the ListItem component(s)
    render(
      <div>
        <SearchBox width="100%" handleFilterData={handleFilterData} />
        {props.userData
          .filter((e: any) => {
            return (
              e.name.toLowerCase().includes("ar") ||
              e.role.toLowerCase().includes("ar") ||
              e.email.toLowerCase().includes("ar")
            );
          })
          .map((e: any) => (
            <ListItem
              key={e.id}
              id={e.id}
              name={e.name}
              email={e.email}
              role={e.role}
              deleteSelectedUsersArr={[]}
              setDeleteSelectedUsersArr={() => {}}
              handleDeleteSelectedUsers={() => {}}
              handleEditSelectedUser={() => {}}
              editSelectedUserObj={{}}
              setEditSelectedUserObj={() => {}}
            />
          ))}
      </div>
    );

    // Look for the search input element by its placeholder text and assert its presence
    const searchBox = screen.getByPlaceholderText(
      "Search by name, email or role"
    );
    expect(searchBox).toBeInTheDocument();

    // Simulate a change event on the search input element and check
    // if the handleFilterData function has been called with the expected argument
    fireEvent.change(searchBox, { target: { value: "Ar" } });
    expect(handleFilterData).toHaveBeenCalledWith("Ar");

    // Checks that the filtered search results (in form of list-items) are displayed on the screen
    expect(screen.getByText("Arvind Kumar")).toBeInTheDocument();

    // Since in our mock data, Aaron and Aishwarya both have roles as members, we expect two results
    expect(screen.queryAllByText("member")).toHaveLength(2);
  });
});
