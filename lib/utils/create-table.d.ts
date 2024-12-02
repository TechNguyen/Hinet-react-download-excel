export interface ITablePayloadEx {
    header: string[];
    body: Array<{
        [key: string]: string | number | boolean;
    }> | Array<(string | number | boolean)[]>;
}
export default function createTable({ header, body }: ITablePayloadEx): string;
