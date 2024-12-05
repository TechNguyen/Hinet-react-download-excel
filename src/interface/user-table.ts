import React from "react";

export interface HinetExcel {
    fileName: string;
    sheet?: string | null;
    currentRefTable: React.RefObject<HTMLTableElement>;
    arrayBuff?: ArrayBuffer | null; 
}

export interface HinetExcelReturn {
    onDownload: () => boolean;
}