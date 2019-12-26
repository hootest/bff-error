import { RetCodeEnum } from "./RetCodeEnum";
export declare class HttpJson {
    retCode: RetCodeEnum;
    retMsg: string;
    data: any;
    constructor(data?: any, retCode?: RetCodeEnum, retMsg?: string);
}
