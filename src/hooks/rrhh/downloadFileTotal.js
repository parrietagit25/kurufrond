import * as XLSX from "xlsx";
import * as fs from "file-saver";
import { Workbook } from "exceljs";

export const downloadFileTotal = async (listData, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(listData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "totales");
  XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workbook, fileName);
};
