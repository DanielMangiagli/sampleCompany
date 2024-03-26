interface TableHeaderProps {
  columns: { key: string; header: string }[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleHeaderClick: (key: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortColumn,
  sortDirection,
  handleHeaderClick,
}) => {
  return (
    <thead>
      <tr>
        <th className="px-4 py-2">Select</th>
        {columns.map((column) => (
          <th
            key={column.key}
            className="px-4 py-2"
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
  );
};

export default TableHeader;
