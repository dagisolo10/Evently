export function isServiceError(result: unknown): result is ServiceError {
    return (
        typeof result === "object" &&
        result !== null &&
        "error" in result &&
        "code" in result &&
        typeof (result as any).error === "string" &&
        typeof (result as any).code === "number"
    );
}

export type ServiceError = {
    error: string;
    code: number;
};
export type SuccessMessage = {
    message: string;
};

export type ServiceResult<T> = Promise<T | ServiceError>;
