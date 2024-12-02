"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const server_1 = require("react-dom/server");
const acceptTypes = ["string", "number", "boolean"];
function createTable({ header, body }) {
    // Tạo header cho excel
    const headers = ((0, jsx_runtime_1.jsx)("tr", { children: header.map((head) => ((0, jsx_runtime_1.jsx)("th", { children: head }, head))) }));
    const bodies = body.map((val, i) => {
        if (Array.isArray(val)) {
            return ((0, jsx_runtime_1.jsx)("tr", { children: val.map((value, idx) => ((0, jsx_runtime_1.jsx)("th", { children: value }, idx))) }, i));
        }
        if (val != null && typeof val === "object") {
            return ((0, jsx_runtime_1.jsx)("tr", { children: Object.entries(val).map(([key, value], i) => {
                    if (typeof value === "object") {
                        console.error(`Kiểu dữ liệu ${key} không tồn tại, yêu cầu thuộc loại dữ liệu cho phép ${acceptTypes.join(", ")} `);
                        return (0, jsx_runtime_1.jsx)("th", {}, i);
                    }
                    return ((0, jsx_runtime_1.jsx)("th", { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: value }) }, i));
                }) }, i));
        }
        console.error("Dữ liệu không hợp lệ");
        return null;
    });
    return (0, server_1.renderToString)((0, jsx_runtime_1.jsx)("table", { children: (0, jsx_runtime_1.jsxs)("tbody", { children: [headers, bodies] }) }));
}
exports.default = createTable;
