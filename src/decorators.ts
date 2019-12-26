import { PageError, RetCodeEnum, ControlError } from "./PageError";

export function ServiceCatch() {
    return (target: object, key: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function (...args: any) {
            try {
                return await fn.apply(this, args);
            } catch (err) {
                throw new PageError(RetCodeEnum.INTERFACE_CALL_ERROR, err);
            }
        }
    }
}

export function ControllerCatch() {
    return (target: object, key: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function (...args: any) {
            try {
                return await fn.apply(this, args);
            } catch (err) {
                throw ControlError(err,`${key} 调用失败`);
            }
        }
    }
}
