import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataRow, exportSelectedRowsToCSV } from "../lib/exportToCsv";
import { sortData } from "../lib/sorting";

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
    if (sortColumn === key) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
      navigate(`?sortColumn=${key}&sortDirection=${newDirection}`);
    } else {
      setSortColumn(key);
      setSortDirection("asc");
      navigate(`?sortColumn=${key}&sortDirection=asc`);
    }
  };
  const sortedData = sortData(data, sortColumn, sortDirection);

  return (
    <>
      <button
        onClick={() =>
          exportSelectedRowsToCSV(
            selectedRows,
            columns,
            data as DataRow[],
            rowKey
          )
        }
      >
        Export Selected Rows
      </button>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleHeaderClick(column.key)}
              >
                {column.header}
                {sortColumn === column.key && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row[rowKey] as React.Key}
              style={
                selectedRows.includes(row[rowKey] as string)
                  ? { backgroundColor: "#f0f0f0" }
                  : {}
              }
              onClick={() =>
                onRowClick ? onRowClick(row[rowKey] as string) : undefined
              }
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row[rowKey] as string)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      row[rowKey] as string,
                      e.target.checked
                    )
                  }
                />
              </td>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.format
                    ? column.format(row[column.key])
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
