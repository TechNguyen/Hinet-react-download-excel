export interface HinetContext {
    worksheet: string,
    table: string,
    arrBuff?: ArrayBuffer | null
}


export type HinetContextTs = "worksheet" | "table";
