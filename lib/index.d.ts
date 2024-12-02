import { FC } from "react";
import { IProperties } from "./interface/hinet-react-export-table-excels";
import { hinetDownloadExcel } from "./hooks/hinetExcel";
import { downloadExcel } from "./library";
declare const DownloadHinetTableExcel: FC<IProperties>;
export { DownloadHinetTableExcel, hinetDownloadExcel, downloadExcel };
