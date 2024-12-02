"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hinetDownloadExcel = void 0;
const react_1 = require("react");
const library_1 = require("../library");
function hinetDownloadExcel({ fileName, sheet, currentRefTable }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [payload, setPayload] = (0, react_1.useState)({});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, react_1.useEffect)(() => {
        setPayload({
            fileName,
            sheet,
            currentRefTable
        });
    }, [fileName, sheet, currentRefTable]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (0, react_1.useMemo)(() => (0, library_1.excel)(payload), [payload]);
}
exports.hinetDownloadExcel = hinetDownloadExcel;
