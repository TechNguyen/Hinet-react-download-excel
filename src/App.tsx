import { useRef } from "react";
import { DownloadHinetTableExcel } from "./DownloadHinetTableExcel";

function App() {
    const tableRef = useRef<HTMLTableElement>(null);
    return (
        <>
            <DownloadHinetTableExcel
                currentRefTable={tableRef}
                fileName="Báo cáo.xlsx"
                sheet="Sheet1"
                child={<button>Tải xuống Excel</button>}
            />

            <table ref={tableRef}>
                <tbody>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Edison</td>
                        <td>Padilla</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>Alberto</td>
                        <td>Lopez</td>
                        <td>94</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default App;
