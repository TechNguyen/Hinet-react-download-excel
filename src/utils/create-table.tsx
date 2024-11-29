import { renderToString } from "react-dom/server";

const acceptTypes = ["string", "number", "boolean"];

export interface ITablePayloadEx {
    header: string[];
    body:
        | Array<{ [key: string]: string | number | boolean }>
        | Array<(string | number | boolean)[]>;
}

export default function createTable({ header, body }: ITablePayloadEx) {
    // Tạo header cho excel
    const headers = (
        <tr>
            {header.map((head) => (
                <th key={head}>{head}</th>
            ))}
        </tr>
    );

    const bodies = body.map((val, i) => {
        if (Array.isArray(val)) {
            return (
                <tr key={i}>
                    {val.map((value, idx) => (
                        <th key={idx}>{value}</th>
                    ))}
                </tr>
            );
        }

        if (val != null && typeof val === "object") {
            return (
                <tr key={i}>
                    {Object.entries(val).map(([key, value], i) => {
                        if (typeof value === "object") {
                            console.error(
                                `Kiểu dữ liệu ${key} không tồn tại, yêu cầu thuộc loại dữ liệu cho phép ${acceptTypes.join(
                                    ", ",
                                )} `,
                            );

                            return <th key={i}></th>;
                        }

                        return (
                            <th key={i}>
                                <>{value}</>
                            </th>
                        );
                    })}
                </tr>
            );
        }
        console.error("Dữ liệu không hợp lệ");
        return null;
    });

    return renderToString(
        <table>
            <tbody>
                {headers}
                {bodies}
            </tbody>
        </table>,
    );
}
