"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadExcel = exports.hinetDownloadExcel = exports.DownloadHinetTableExcel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hinetExcel_1 = require("./hooks/hinetExcel");
Object.defineProperty(exports, "hinetDownloadExcel", { enumerable: true, get: function () { return hinetExcel_1.hinetDownloadExcel; } });
const library_1 = require("./library");
Object.defineProperty(exports, "downloadExcel", { enumerable: true, get: function () { return library_1.downloadExcel; } });
const DownloadHinetTableExcel = ({ currentRefTable, fileName, sheet, child, }) => {
    const { onDownload } = (0, hinetExcel_1.hinetDownloadExcel)({
        fileName,
        sheet,
        currentRefTable,
    });
    return (0, jsx_runtime_1.jsx)("span", Object.assign({ onClick: onDownload }, { children: child }));
};
exports.DownloadHinetTableExcel = DownloadHinetTableExcel;
