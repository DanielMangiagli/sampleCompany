import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar", () => {
  const items = [
    { path: "/", label: "Home" },
    { path: "/devices", label: "Devices" },
    { path: "/vulnerabilities", label: "Vulnerabilities" },
  ];

  it.each(items)("renders the item with label %s", (item) => {
    render(
      <MemoryRouter>
        <NavBar items={items} />
      </MemoryRouter>
    );

    expect(screen.getByText(item.label)).toBeVisible();
  });
});
