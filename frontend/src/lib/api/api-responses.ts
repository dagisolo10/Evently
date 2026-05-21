export type ZodError = {
    error: string;
    details?: string;
};

export type ApiMessage = {
    message: string;
};

export type ApiError = {
    error: string;
    code: number;
};

export type ApiResult<T> = T | ApiError;

export type ApiReturnType<T> = Promise<T | ApiError>;