import { HttpError } from "routing-controllers";
import { HttpJson } from "./HttpJson";
import { RetCodeEnum } from "./RetCodeEnum";
import * as protobuf from 'protobufjs';
import { resolve } from 'path';

function getErrMessage(retMsg: any) {
    let errMessage: string;
    if (typeof retMsg === "object") {
        if (retMsg.details !== undefined && typeof retMsg.details === "string") {
            errMessage = retMsg.details;
        }
        else if (retMsg.message !== undefined && typeof retMsg.message === "string") {
            errMessage = retMsg.message;
        }
        else {
            errMessage = "未知错误";
        }
    }
    else if (typeof retMsg === "string") {
        errMessage = retMsg;
    }
    else {
        errMessage = "未知错误";
    }
    return errMessage;
}

export class PageError extends HttpError {
    public retCode: RetCodeEnum;
    public retMsg: string;
    public data: any;

    constructor(retCode: RetCodeEnum = RetCodeEnum.CORRECT, retMsg: any, data: any = "") {
        super(200);
        Object.setPrototypeOf(this, PageError.prototype);

        if (retCode == RetCodeEnum.INTERFACE_CALL_ERROR) {
            console.error(retMsg);
        }
        let errMessage: string = getErrMessage(retMsg);

        if (typeof retMsg === "object") {
            if (retMsg.retCode) {
                this.retCode = retMsg.retCode;
                this.retMsg = retMsg.retMsg;
                this.data = retMsg.data;
                return;
            }

            if (retMsg.metadata && retMsg.metadata._internal_repr && retMsg.metadata._internal_repr["grpc-status-details-bin"] && retMsg.metadata._internal_repr["grpc-status-details-bin"].length) {
                try {
                    const root = protobuf.loadSync(resolve(__dirname, 'ErrorInfo.proto'));
                    const ErrorInfo = root.lookupType("error.ErrorInfo");
                    const ErrorDetail = root.lookupType("error.ErrorDetail");

                    const buffer = retMsg.metadata._internal_repr["grpc-status-details-bin"][0];
                    let message = ErrorInfo.decode(buffer);
                    let errMessageObj = ErrorInfo.toObject(message, {
                        defaults: true,
                        arrays: true,
                        objects: true,
                        oneofs: true
                    });
                    // detail为业务抛的业务信息
                    message = ErrorDetail.decode(errMessageObj.detail.value);
                    errMessageObj = ErrorDetail.toObject(message, {
                        defaults: true,
                        arrays: true,
                        objects: true,
                        oneofs: true
                    });

                    retCode = errMessageObj.code;
                    errMessage = errMessageObj.msg;
                }
                catch (err) {
                    console.error(err);
                    errMessage = getErrMessage(retMsg);
                }
            }
        }

        this.retCode = retCode;
        this.retMsg = errMessage;
        this.data = data;
    }

    toJSON() {
        return new HttpJson(this.data, this.retCode, this.retMsg);
    }
}

export function ControlError(err: any, errTip: string): PageError {
    if (err.retCode !== undefined) {
        let retCode = err.retCode;
        let retMsg = err.retMsg;
        return new PageError(retCode, retMsg);
    }
    else {
        console.error(errTip, err);
        return new PageError(RetCodeEnum.CONTROLLER_CALL_ERR, err.message);
    }
}


export { RetCodeEnum }