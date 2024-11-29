import * as utls from "./utils";
import { HinetContext } from "./interface/context";
import { HinetExcel, HinetExcelReturn } from "./interface/user-table";
import { ITablePayloadEx } from "./utils/create-table";


function download(fileName: string, context: HinetContext): boolean {
    const element = window.document.createElement("a");
    element.href =
    utls.uri + utls.base64(utls.format(utls.template, context));
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return true;
  }
  
function getHinetTable(currentRefTable?: any, tablePayLoad?: ITablePayloadEx) {
    if(currentRefTable) {
        const cloneTable = currentRefTable.cloneNode(true);
        return cloneTable.outerHTML
    }
    
    if(tablePayLoad) {
        return utls.createTable(tablePayLoad)
    }
    console.error("currentTableRef or tablePayload does not exist");
}

function handleDownload(
    {
      fileName,
      sheet,
      tablePayload,
    }: { fileName: string; sheet: string; tablePayload?: ITablePayloadEx },
    currentTableRef?: HTMLElement
  ) {
    const table = getHinetTable(currentTableRef, tablePayload);
    const context: HinetContext = {
      worksheet: sheet || "Worksheet",
      table,
    };
  
    return download(fileName, context);
  }



function excel({ currentRefTable, fileName, sheet }: HinetExcel): HinetExcelReturn {
  function onDownload(): boolean {
    const table = getHinetTable(currentRefTable);
    const filename = `${fileName}.xlsx`;
    const context: HinetContext = {
      worksheet: sheet || "Worksheet",
      table,
    };

    return download(filename, context);
  }

  return { onDownload };
}

export { excel, handleDownload as downloadExcel };
