import * as utls from "./utils";
import { HinetContext } from "./interface/context";
import { HinetExcel, HinetExcelReturn } from "./interface/user-table";
import { ITablePayloadEx } from "./utils/create-table";
import * as XLSX from 'xlsx';
import React from "react";
import { toast } from "react-toastify";
type TableData = string[][]
const readExcelFromTemplate = (fileName: string, context: HinetContext): boolean => {
  if (!context || !context.arrBuff) {
    if (!context.table) {
      toast.error('HTML table lỗi không nhận được!');
      return false;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(context.table, 'text/html');
    const table = doc.querySelector('table');
    if (!table) {
      toast.error('Không tìm thấy bảng trong HTML!');
      return false;
    }
    const rows = table.querySelectorAll('tr');
    const tableData: TableData = [];

    rows.forEach((row) => {
      const rowData: string[] = [];
      const cells = row.querySelectorAll('td, th');  // Lấy tất cả các ô (th và td)
      cells.forEach((cell) => {
        rowData.push(cell.textContent?.trim() || '');  // Lấy nội dung của ô và loại bỏ khoảng trắng thừa
      });
      tableData.push(rowData);
    });
    // Tạo workbook (tệp Excel) từ dữ liệu bảng
    const wse = XLSX.utils.aoa_to_sheet(tableData);  // Chuyển đổi mảng mảng thành sheet
    const wbe = XLSX.utils.book_new();  // Tạo workbook mới
    XLSX.utils.book_append_sheet(wbe, wse, fileName);  // Thêm sheet vào workbook
    XLSX.writeFile(wbe, fileName);
    return true;
  } 
  else {
    const wb = XLSX.read(context.arrBuff, { type: 'array' });
    const sheetName = wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];
    const parse = new DOMParser();
    const doc = parse.parseFromString(context.table, 'text/html');
    const tbody = doc.querySelector('tbody');
    const tableData: TableData = [];
    const rows = tbody?.querySelectorAll('tr');
    rows?.forEach(r => {
      const rowData :string[] = [];
      const cells = r.querySelectorAll('td');
      cells.forEach(c => {
        rowData.push(c.textContent?.trim() || "");
      })
      tableData.push(rowData);
    })
    let rowIndex = 2;
    tableData.forEach((rowData) => {
      rowData.forEach((cellDt,colIndex ) => {
        const cellAddress = { r: rowIndex, c: colIndex }; 
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        if (!ws[cellRef]) {
          ws[cellRef] = { v: cellDt };
        } else {
          console.log(`Ô ${cellRef} đã có dữ liệu, bỏ qua hoặc cập nhật.`);
        }
        rowIndex++;
      })
    })
    XLSX.writeFile(wb,fileName);
    return true;
  }
}



function getHinetTable(currentRefTable?: React.RefObject<HTMLTableElement>, tablePayLoad?: ITablePayloadEx) {
    if(currentRefTable?.current) {
        const cloneTable = currentRefTable.current.cloneNode(true) as HTMLTableElement;
        return cloneTable.outerHTML
    }
    if(tablePayLoad) {
        return utls.createTable(tablePayLoad)
    }
}
function excel({ currentRefTable, fileName, sheet, arrayBuff  }: HinetExcel): HinetExcelReturn {
  function onDownload(): boolean {
    const table = getHinetTable(currentRefTable);
    const filename = `${fileName}`;
    if (!table) {
      console.error("Failed to retrieve table.");
      return false;
    }
    const context: HinetContext = {
      worksheet: sheet || "Worksheet",
      table,
      arrBuff: arrayBuff
    };

    return readExcelFromTemplate(filename, context);
  }

  return { onDownload };
}

export { excel };
