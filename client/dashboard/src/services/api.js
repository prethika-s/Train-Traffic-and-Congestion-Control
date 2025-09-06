import * as XLSX from "xlsx";

export const fetchTrainData = async () => {
  const response = await fetch("../train_data.xlsx");
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  return jsonData;
};
