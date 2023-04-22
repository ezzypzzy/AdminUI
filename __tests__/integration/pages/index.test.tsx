import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/src/pages/index";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("The home page integration tests", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("Renders app without crashing", async () => {
    mockAxios.onGet("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").reply(200, []);
    await act(async () => {
      render(<Home />);
    });
    expect(() => render(<Home />)).not.toThrow();
    // wait for some async operation to finish
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
