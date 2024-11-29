import React, { FC } from "react";
import { IProperties } from "./interface/hinet-react-export-table-excels";
import { hinetDownloadExcel } from "./hooks/hinetExcel";
import { downloadExcel } from "./library";

const DownloadTableExcel: FC<IProperties> = ({
    currentRefTable,
    fileName,
    sheet,
    child,
}) => {
    const { onDownload } = hinetDownloadExcel({
        fileName,
        sheet,
        currentRefTable,
    });
    return <span onClick={onDownload}>{child}</span>;
};

export { DownloadTableExcel, hinetDownloadExcel, downloadExcel };