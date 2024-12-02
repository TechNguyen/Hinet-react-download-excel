import { HinetExcel, HinetExcelReturn } from "./interface/user-table";
import { ITablePayloadEx } from "./utils/create-table";
declare function handleDownload({ fileName, sheet, tablePayload, }: {
    fileName: string;
    sheet: string;
    tablePayload?: ITablePayloadEx;
}, currentTableRef?: HTMLElement): boolean;
declare function excel({ currentRefTable, fileName, sheet }: HinetExcel): HinetExcelReturn;
export { excel, handleDownload as downloadExcel };
