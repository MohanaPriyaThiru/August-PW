import XLSX from "xlsx";

const path = "testData/utils.xlsx";

type readertype = {
  UserName: string;
  Password: string;
  Result: string;
};
export function reader() {
  const workbook = XLSX.readFile(path);
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
  const data: readertype[] = XLSX.utils.sheet_to_json(worksheet);
  console.log(data);
  return data;
}

