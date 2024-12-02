export interface HinetExcel {
    fileName: string;
    sheet?: string;
    currentRefTable: any;
}
export interface HinetExcelReturn {
    onDownload: () => boolean;
}
