import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../Home";
import { render } from "../../../test-utils/renderMock";

const component = () => render(<Home />);

describe("Home test suite", () => {
  it("Renders correctly", async () => {
    component();

    expect(screen.getByText("List of characters")).toBeVisible();
    await waitFor(() => expect(screen.getByText("Luke Skywalker")).toBeVisible());
  });

  it("Searches by character name", async () => {
    component();

    const searchInput = screen.getByLabelText("search");

    await waitFor(() => expect(screen.getByText("Luke Skywalker")).toBeVisible());

    userEvent.type(searchInput, "d");

    await waitFor(() => expect(screen.queryByText("Luke Skywalker")).toBeNull());
    await waitFor(() => expect(screen.getByText("R2-D2")).toBeVisible());

    userEvent.type(searchInput, "e");

    await waitFor(() => expect(screen.queryByText("R2-D2")).toBeNull());
    await waitFor(() => expect(screen.getByText("Darth Vader")).toBeVisible());

    userEvent.clear(searchInput);
    await waitFor(() => expect(screen.getByText("Luke Skywalker")).toBeVisible());
  });

  it("Displays modal when character card is clicked", async () => {
    component();

    await waitFor(() => expect(screen.getByText("Luke Skywalker")).toBeVisible());

    expect(screen.queryByText(/Gender/i)).toBeNull();
    userEvent.click(screen.getByText("Luke Skywalker"));

    await waitFor(() => expect(screen.getByText(/Gender/i)).toBeVisible());

    userEvent.click(screen.getByLabelText("close"));

    await waitFor(() => expect(screen.queryByText(/Gender/i)).toBeNull());
  });
});
