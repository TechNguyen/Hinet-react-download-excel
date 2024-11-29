import { useEffect, useMemo, useState } from "react";
import { HinetExcel } from "../interface/user-table";
import { excel } from "../library";


export function hinetDownloadExcel({ fileName,
    sheet,
    currentRefTable}: HinetExcel ) {
    const [payload,setPayload] = useState({} as HinetExcel);
    useEffect(() => {
        setPayload({
            fileName,
            sheet,
            currentRefTable
        })
    }, [fileName,sheet,currentRefTable])
        
    return useMemo(() => excel(payload), [payload]);
}