export enum RetCodeEnum {
    // 正常 = 0,
    CORRECT = 0,

    // 通用错误 = 1,
    GENERAL_ERROR = 1,

    // gRPC接口调用错误 = 2,
    INTERFACE_CALL_ERROR = 2,

    // controller调用错误 = 3,
    CONTROLLER_CALL_ERR = 3,

    // 请求超时 = 4,
    REQUEST_TIMEOUT = 4,

    // 未登录 = 5,
    LOGIN_OUT = 5,

    // 中间件调用错误
    MIDDLEWARE_ERROR = 6,

    // 无权限
    NO_PERMISSION = 7,
}

