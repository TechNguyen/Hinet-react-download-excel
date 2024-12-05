import React, { FC } from "react";
import { IProperties } from "./interface/hinet-react-export-table-excels";
import { hinetDownloadExcel } from "./hooks/hinetExcel";

const DownloadHinetTableExcel: FC<IProperties> = ({
    currentRefTable,
    fileName,
    sheet,
    child,
    arrayBuff,
}) => {
    const { onDownload } = hinetDownloadExcel({
        fileName,
        sheet,
        currentRefTable,
        arrayBuff,
    });
    return <span onClick={onDownload}>{child}</span>;
};

export { DownloadHinetTableExcel, hinetDownloadExcel };
