import { z } from "zod";
import type { NextFunction, Request, Response } from "express";

type ValidateType = "body" | "params" | "query";

type Validate = {
    schema: z.ZodSchema;
    type: ValidateType;
};

export function validate({ schema, type }: Validate) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            switch (type) {
                case "body":
                    req.body = schema.parse(req.body);
                    next();
                    break;

                case "params":
                    const parsedParams = schema.parse(req.params);
                    Object.assign(req.params, parsedParams);
                    next();
                    break;

                case "query":
                    const parsedQuery = schema.parse(req.query);
                    Object.assign(req.query, parsedQuery);
                    next();
                    break;

                default:
                    throw new Error("Invalid validation type");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: error.issues.map((err) => err.message).join(". "),
                });
            }
            if (typeof error === "string") {
                return res.status(400).json({ error });
            }

            return res.status(400).json({ error: "Invalid input" });
        }
    };
}
