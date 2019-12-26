"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const HttpJson_1 = require("./HttpJson");
const RetCodeEnum_1 = require("./RetCodeEnum");
exports.RetCodeEnum = RetCodeEnum_1.RetCodeEnum;
const protobuf = require("protobufjs");
const path_1 = require("path");
function getErrMessage(retMsg) {
    let errMessage;
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
class PageError extends routing_controllers_1.HttpError {
    constructor(retCode = RetCodeEnum_1.RetCodeEnum.CORRECT, retMsg, data = "") {
        super(200);
        Object.setPrototypeOf(this, PageError.prototype);
        if (retCode == RetCodeEnum_1.RetCodeEnum.INTERFACE_CALL_ERROR) {
            console.error(retMsg);
        }
        let errMessage = getErrMessage(retMsg);
        if (typeof retMsg === "object") {
            if (retMsg.retCode) {
                this.retCode = retMsg.retCode;
                this.retMsg = retMsg.retMsg;
                this.data = retMsg.data;
                return;
            }
            if (retMsg.metadata && retMsg.metadata._internal_repr && retMsg.metadata._internal_repr["grpc-status-details-bin"] && retMsg.metadata._internal_repr["grpc-status-details-bin"].length) {
                try {
                    const root = protobuf.loadSync(path_1.resolve(__dirname, 'ErrorInfo.proto'));
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
        return new HttpJson_1.HttpJson(this.data, this.retCode, this.retMsg);
    }
}
exports.PageError = PageError;
function ControlError(err, errTip) {
    if (err.retCode !== undefined) {
        let retCode = err.retCode;
        let retMsg = err.retMsg;
        return new PageError(retCode, retMsg);
    }
    else {
        console.error(errTip, err);
        return new PageError(RetCodeEnum_1.RetCodeEnum.CONTROLLER_CALL_ERR, err.message);
    }
}
exports.ControlError = ControlError;
