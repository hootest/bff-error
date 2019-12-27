import { PageError, RetCodeEnum, ControlError } from "./PageError";
import { HttpJson } from "./HttpJson";

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
                const result = await fn.apply(this, args);
                return new HttpJson(result);
            } catch (err) {
                throw ControlError(err, `${key} 调用失败`);
            }
        }
    }
}
