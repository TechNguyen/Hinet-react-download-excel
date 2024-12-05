import { useEffect, useMemo, useState } from "react";
import { HinetExcel } from "../interface/user-table";
import { excel } from "../library";


export function hinetDownloadExcel({ fileName,
    sheet,
    currentRefTable,
    arrayBuff
}: HinetExcel ) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [payload,setPayload] = useState({} as HinetExcel);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setPayload({
            fileName,
            sheet,
            currentRefTable,
            arrayBuff
        })
    }, [fileName,sheet,currentRefTable,arrayBuff])
        
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(() => excel(payload), [payload]);
}