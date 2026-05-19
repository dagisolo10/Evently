import env from "@/utils/env";
import type { NextFunction, Request, Response } from "express";

export default function errorMiddleWare(err: Error, _: Request, res: Response, __: NextFunction) {
    console.error(err.stack);

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(env.NODE_ENV === "development" && { stack: err.stack }),
    });
}
