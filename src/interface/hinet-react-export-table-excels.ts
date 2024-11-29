import { ReactElement } from 'react'
import {HinetExcel} from "./user-table"

export interface IProperties extends HinetExcel {
    child: ReactElement | ReactElement[]
}