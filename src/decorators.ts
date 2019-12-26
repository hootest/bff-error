import { PageError, RetCodeEnum, ControlError } from "./PageError";

export function ServiceCache() {
    return (target: object, key: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = function (...args: any) {
            try {
                return fn.apply(this, args);
            } catch (err) {
                throw new PageError(RetCodeEnum.INTERFACE_CALL_ERROR, err);
            }
        }
    }
}

export function ControllerCache() {
    return (target: object, key: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = function (...args: any) {
            try {
                return fn.apply(this, args);
            } catch (err) {
                throw ControlError(err,`${key} 调用失败`);
            }
        }
    }
}
