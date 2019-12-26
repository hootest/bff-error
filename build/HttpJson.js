"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RetCodeEnum_1 = require("./RetCodeEnum");
class HttpJson {
    constructor(data = "", retCode = RetCodeEnum_1.RetCodeEnum.CORRECT, retMsg = "") {
        this.retCode = retCode;
        this.retMsg = retMsg;
        this.data = data;
    }
}
exports.HttpJson = HttpJson;
