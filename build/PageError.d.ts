import { HttpError } from "routing-controllers";
import { HttpJson } from "./HttpJson";
import { RetCodeEnum } from "./RetCodeEnum";
export declare class PageError extends HttpError {
    retCode: RetCodeEnum;
    retMsg: string;
    data: any;
    constructor(retCode: RetCodeEnum | undefined, retMsg: any, data?: any);
    toJSON(): HttpJson;
}
export declare function ControlError(err: any, errTip: string): PageError;
export { RetCodeEnum };
