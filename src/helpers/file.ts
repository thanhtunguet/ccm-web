import * as XLSX from 'xlsx'; // Importing xlsx library for handling Excel files

// Define a function to read an Excel file, parse its first sheet to a list of objects, and return the data
const readExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // Create a FileReader object
    reader.onload = (event: any) => {
      const data = new Uint8Array(event.target.result); // Convert file to Uint8Array
      const workbook = XLSX.read(data, { type: 'array' }); // Read Excel file into workbook
      const firstSheetName = workbook.SheetNames[0]; // Get the name of the first sheet
      const worksheet = workbook.Sheets[firstSheetName]; // Get the first sheet
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert sheet to JSON with headers
      const headers: string[] = jsonData.shift() as string[]; // Remove headers from data and store them separately
      const dataList = jsonData.map((row: any) => { // Map each row to an object with headers as keys
        const rowData: { [key: string]: any } = {};
        headers.forEach((header: string, index: number) => {
          rowData[header] = row[index];
        });
        return rowData;
      });
      resolve(dataList); // Resolve promise with list of objects
    };
    reader.onerror = (error) => reject(error); // Reject promise if there's an error
    reader.readAsArrayBuffer(file); // Read file as array buffer
  });
};

export default readExcelFile; // Export the function for use in other modules
