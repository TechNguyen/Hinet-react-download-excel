import * as utls from "./utils";
import { HinetContext } from "./interface/context";
import { HinetExcel, HinetExcelReturn } from "./interface/user-table";
import { ITablePayloadEx } from "./utils/create-table";
import * as XLSX from 'xlsx';
import React from "react";
import { toast } from "react-toastify";
type TableData = string[][]



const readExcelFromTemplate = (fileName: string, context: HinetContext): boolean => {

  try {

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
        const cells = row.querySelectorAll('td, th');  
        cells.forEach((cell) => {
          rowData.push(cell.textContent?.trim() || '');
        });
        tableData.push(rowData);
      });
      const wse = XLSX.utils.aoa_to_sheet(tableData);  
      const wbe = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wbe, wse, fileName);  
      XLSX.writeFile(wbe, fileName);
      return true;
    } 
    else {
      const wb = XLSX.read(context.arrBuff, { type: 'array' });
      const sheetName = wb.SheetNames[0];
      debugger
      const ws = wb.Sheets[sheetName];
      const parse = new DOMParser();
      const doc = parse.parseFromString(context.table, 'text/html');
      const tbody = doc.querySelector('tbody');

      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });

     // Giả sử bạn đã biết dòng và cột bắt đầu và kết thúc
      const startRow = 5; // Dòng bắt đầu
      const endRow = 102;  // Dòng kết thúc
      const startCol = 0; // Cột bắt đầu (0-based index)
      const endCol = 2;   // Cột kết thúc (0-based index)

      // Lấy dữ liệu từ các hàng trong tbody
      const tableData: TableData = [];
      const rows = tbody?.querySelectorAll('tr');
      rows?.forEach((r, rowIndex) => {
        const rowData: string[] = [];
        const cells = r.querySelectorAll('td');
        cells.forEach((c) => {
          rowData.push(c.textContent?.trim() || "");
        });
        tableData.push(rowData);
      });


      


      for (let colIndex = startCol; colIndex <= endCol; colIndex++) {
        for (let rowIdx = 0; rowIdx <= startRow - 1; rowIdx++) {
          const cellAddress = { r:  rowIdx, c: colIndex }; // Địa chỉ ô Excel
          const cellRef = XLSX.utils.encode_cell(cellAddress);
          const existingStyle = ws[cellRef];
          console.log(ws[cellRef]);
          
          if (existingStyle) {
            ws[cellRef] = {
              h: existingStyle?.h,
              r: existingStyle?.r,
             
            }

            console.log(ws[cellRef]);
            
          }
        }
      }

    // Duyệt qua các ô trong Excel và thêm dữ liệu từ tableData nếu ô đó trống
    tableData.forEach((rowData, rowIndex) => {
      for (let colIndex = startCol; colIndex <= endCol; colIndex++) {
      const cellAddress = { r: startRow + rowIndex, c: colIndex }; // Địa chỉ ô Excel
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      // Nếu ô chưa có dữ liệu, thêm dữ liệu từ tableData
      const cellValue = rowData[colIndex - startCol];
      if (!ws[cellRef] || !ws[cellRef].v) {
        const cellStyle = ws[cellRef] ? ws[cellRef].s : null;
        // Chỉ thêm nếu ô chưa có dữ liệu hoặc dữ liệu trống
          if (cellValue !== undefined && cellValue !== null && cellValue !== "") {
            ws[cellRef] = {
              v: cellValue,
              s: cellStyle
            }; // Thêm dữ liệu vào ô trống
          }
      } else {
        const existingStyle = ws[cellRef];
        ws[cellRef] = ws[cellRef];
    }
      }
    });



    const updatedArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });



    const blob = new Blob([updatedArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'updated_file.xlsx';
    document.body.appendChild(a);
    a.click();
  
    // Giải phóng bộ nhớ URL
    URL.revokeObjectURL(downloadUrl);

  //update nội dung và xuất file
  // XLSX.writeFile(wb, fileName);
  return true;
    }
  } catch (error) {
    return false;
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
