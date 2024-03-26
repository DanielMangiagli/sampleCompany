import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import TableHeader from "./TableHeader";
import { DataRow, exportSelectedRowsToCSV } from "./helpers/exportToCsv";
import { sortData } from "./helpers/sortData";

interface Column {
  key: string;
  header: string;
  format?: (value: string | number | string[]) => string;
}

interface TableProps {
  data: { [key: string]: string | number | string[] }[];
  columns: Column[];
  rowKey: string;
  onRowClick?: (id: string | number) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, rowKey, onRowClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const handleCheckboxChange = (key: string | number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows([...selectedRows, key]);
    } else {
      setSelectedRows(selectedRows.filter((row) => row !== key));
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const column = params.get("sortColumn");
    const direction = params.get("sortDirection");
    if (column) setSortColumn(column);
    if (direction === "asc" || direction === "desc")
      setSortDirection(direction);
  }, [location.search]);

  const handleHeaderClick = (key: string) => {
    let newDirection: "asc" | "desc" = "asc";

    if (sortColumn === key) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    }

    setSortColumn(key);
    setSortDirection(newDirection);
    navigate(`?sortColumn=${key}&sortDirection=${newDirection}`);
  };

  const handleExportClick = () => {
    if (selectedRows.length === 0) {
      alert("No rows selected. Please select at least one row to export.");
      return;
    }

    try {
      exportSelectedRowsToCSV(selectedRows, columns, data as DataRow[], rowKey);
      alert("Export successful!");
    } catch (error) {
      console.error(error);
      alert("Export failed. Please try again.");
    }
  };

  const sortedData = sortData(data, sortColumn, sortDirection);

  return (
    <section className="p-4 bg-white rounded shadow">
      <Button onClick={handleExportClick} text="Export Selected Rows" />
      <article>
        <table className="w-full text-left table-auto">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleHeaderClick={handleHeaderClick}
          />
          <tbody>
            {sortedData.map((row) => (
              <tr
                key={row[rowKey] as React.Key}
                className={`${
                  selectedRows.includes(row[rowKey] as string)
                    ? "bg-gray-200"
                    : ""
                } ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={() =>
                  onRowClick ? onRowClick(row[rowKey] as string) : undefined
                }
              >
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row[rowKey] as string)}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) =>
                      handleCheckboxChange(
                        row[rowKey] as string,
                        e.target.checked
                      )
                    }
                    data-testid={`checkbox-${row[rowKey]}`}
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="border px-4 py-2">
                    {column.format
                      ? column.format(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default Table;
