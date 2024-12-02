# HinetReactExportExcel

## Dùng để xuất (.xlsx) file từ HTML table.

---

## Installation

```
npm install hinet-excel-master
yarn add hinet-excel-master
```

## Features

-   Download HTML table as Excel file in .xlsx format

## Options

-   #### Component

A list of available properties can be found below. These must be passed to the containing `DownloadTableExcel` component.

| Props               | Type           | Description             |
| ------------------- | -------------- | ----------------------- |
| **fileName**        | _string_       | Tên file.               |
| **sheet**           | _string_       | Tên sheet.              |
| **children**        | _ReactElement_ | Tạo button để tải file. |
| **currentRefTable** | _HTMLElement_  | Table current ref.      |

#### Example

```javascript
import React, {useRef} from 'react';
import { DownloadHinetTableExcel } from 'hinet-excel-master';

const Test = () =>  {
    const tableRef = useRef(null);

        return (
            <div>
                <DownloadHinetTableExcel
                    fileName="users table"
                    sheet="users"
                    currentRefTable={tableRef.current}
                    child={ <button> Export excel </button>}
                />



                <table  ref={tableRef}>
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

            </div>
        );
    }
}

export default Test
```
