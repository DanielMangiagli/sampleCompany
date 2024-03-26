import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Table from "./Table";

vi.mock("react-router-dom", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("react-router-dom")>()),
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: "/" }),
    navigate: vi.fn(),
  };
});
const navigate = vi.fn();
const mockExportSelectedRowsToCSV = vi.fn();

vi.mock("./helpers/exportToCsv", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("./helpers/exportToCsv")>()),
    exportSelectedRowsToCSV: () => mockExportSelectedRowsToCSV(),
  };
});

const handleRowClick = vi.fn((id: string | number) => {
  navigate(`/devices/${id}`);
});
describe("Table", () => {
  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
  ];
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  it("renders the table headers and data", () => {
    render(
      <Table
        data={data}
        columns={columns}
        rowKey="id"
        onRowClick={handleRowClick}
      />
    );

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    data.forEach((item) => {
      expect(screen.getByText(item.id.toString())).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it("calls handleRowClick when a row is clicked", () => {
    render(
      <Table
        data={data}
        columns={columns}
        rowKey="id"
        onRowClick={handleRowClick}
      />
    );

    fireEvent.click(screen.getByText("Item 1"));
    expect(handleRowClick).toHaveBeenCalledWith(1);
  });
  describe("Export CSV", () => {
    const columns = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
    ];
    const data = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

    it("alerts when no rows are selected for export", () => {
      window.alert = vi.fn();

      render(<Table data={data} columns={columns} rowKey="id" />);

      fireEvent.click(screen.getByText("Export Selected Rows"));

      expect(window.alert).toHaveBeenCalledWith(
        "No rows selected. Please select at least one row to export."
      );
    });

    it("calls exportSelectedRowsToCSV when rows are selected for export", () => {
      window.alert = vi.fn();
      render(<Table data={data} columns={columns} rowKey="id" />);

      fireEvent.click(screen.getByTestId("checkbox-1"));

      fireEvent.click(screen.getByText("Export Selected Rows"));

      expect(window.alert).toHaveBeenCalledWith("Export successful!");
    });
  });
});
