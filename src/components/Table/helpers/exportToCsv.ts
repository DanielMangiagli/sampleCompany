import { saveAs } from "file-saver";
import Papa from "papaparse";

export interface DataRow {
  [key: string]: string | number;
}

interface Column {
  header: string;
  key: string;
  format?: (value: string | number) => string | number;
}

export const exportSelectedRowsToCSV = (
  selectedRows: Array<string | number>,
  columns: Column[],
  data: DataRow[],
  rowKey: string
): void => {
  if (selectedRows.length === 0) {
    return;
  }
  const filteredData = data.filter((row) => selectedRows.includes(row[rowKey]));

  // Create an array of objects representing the rows to export
  const rowsToExport = filteredData.map((row) => {
    const exportedRow: { [key: string]: string | number } = {};
    columns.forEach((column) => {
      exportedRow[column.header] = column.format
        ? column.format(row[column.key])
        : row[column.key];
    });
    return exportedRow;
  });

  // Convert the data to CSV format
  const csv = Papa.unparse(rowsToExport);

  // Create a Blob object from the CSV string
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  // Use FileSaver to download the file
  saveAs(blob, "export.csv");
};
