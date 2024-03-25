export const sortData = (
  data: { [key: string]: string | number | string[] }[],
  sortColumn: string | null,
  sortDirection: "asc" | "desc"
) => {
  return [...data].sort((a, b) => {
    if (sortColumn === null) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
};
