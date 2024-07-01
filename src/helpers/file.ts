/* eslint-disable @typescript-eslint/no-explicit-any */

import * as XLSX from 'xlsx';


const readExcelFile = (file: File): Promise<Record<string, any>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); 
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(event.target!.result as ArrayBuffer); 
      const workbook = XLSX.read(data, { type: 'array' }); 
      const firstSheetName = workbook.SheetNames[0]; 
      const worksheet = workbook.Sheets[firstSheetName]; 
      const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 }); 
      const headers: string[] = jsonData.shift() as string[]; 
      const dataList = jsonData.map((row: any[]) => { 
        const rowData: { [key: string]: any } = {};
        headers.forEach((header: string, index: number) => {
          rowData[header] = row[index];
        });
        return rowData;
      });
      resolve(dataList); 
    };
    reader.onerror = (error) => reject(error); 
    reader.readAsArrayBuffer(file); 
  });
};

export default readExcelFile; 
