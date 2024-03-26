import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  const handleHeaderClick = vi.fn();
  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
  ];

  it("renders the table headers", () => {
    render(
      <TableHeader
        columns={columns}
        sortColumn="id"
        sortDirection="asc"
        handleHeaderClick={handleHeaderClick}
      />
    );

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  it("calls handleHeaderClick when a header is clicked", () => {
    render(
      <TableHeader
        columns={columns}
        sortColumn="id"
        sortDirection="asc"
        handleHeaderClick={handleHeaderClick}
      />
    );

    fireEvent.click(screen.getByText("ID"));
    expect(handleHeaderClick).toHaveBeenCalledWith("id");
  });
});
