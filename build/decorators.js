"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageError_1 = require("./PageError");
function ServiceCache() {
    return (target, key, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = function (...args) {
            try {
                return fn.apply(this, args);
            }
            catch (err) {
                throw new PageError_1.PageError(PageError_1.RetCodeEnum.INTERFACE_CALL_ERROR, err);
            }
        };
    };
}
exports.ServiceCache = ServiceCache;
function ControllerCache() {
    return (target, key, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = function (...args) {
            try {
                return fn.apply(this, args);
            }
            catch (err) {
                throw PageError_1.ControlError(err, `${key} 调用失败`);
            }
        };
    };
}
exports.ControllerCache = ControllerCache;
