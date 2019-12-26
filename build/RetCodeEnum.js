"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RetCodeEnum;
(function (RetCodeEnum) {
    // 正常 = 0,
    RetCodeEnum[RetCodeEnum["CORRECT"] = 0] = "CORRECT";
    // 通用错误 = 1,
    RetCodeEnum[RetCodeEnum["GENERAL_ERROR"] = 1] = "GENERAL_ERROR";
    // gRPC接口调用错误 = 2,
    RetCodeEnum[RetCodeEnum["INTERFACE_CALL_ERROR"] = 2] = "INTERFACE_CALL_ERROR";
    // controller调用错误 = 3,
    RetCodeEnum[RetCodeEnum["CONTROLLER_CALL_ERR"] = 3] = "CONTROLLER_CALL_ERR";
    // 请求超时 = 4,
    RetCodeEnum[RetCodeEnum["REQUEST_TIMEOUT"] = 4] = "REQUEST_TIMEOUT";
    // 未登录 = 5,
    RetCodeEnum[RetCodeEnum["LOGIN_OUT"] = 5] = "LOGIN_OUT";
    // 中间件调用错误
    RetCodeEnum[RetCodeEnum["MIDDLEWARE_ERROR"] = 6] = "MIDDLEWARE_ERROR";
    // 无权限
    RetCodeEnum[RetCodeEnum["NO_PERMISSION"] = 7] = "NO_PERMISSION";
})(RetCodeEnum = exports.RetCodeEnum || (exports.RetCodeEnum = {}));
