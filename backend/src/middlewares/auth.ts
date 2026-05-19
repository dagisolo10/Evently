import { runWithUserId } from "@/lib/request-context";
import env from "@/utils/env";
import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    let userId: string | null = null;
    const isDevelopment = env.NODE_ENV === "development";

    const { isAuthenticated, userId: clerkUserId } = getAuth(req);

    if (!isAuthenticated && !isDevelopment) {
        return res.status(401).json({ error: "User is not authenticated" });
    }

    userId = isDevelopment ? (req.headers["userid"] as string) : clerkUserId;

    if (!userId) {
        return res.status(401).json({ error: isDevelopment ? "userId header is required" : "Unauthorized" });
    }

    req.userId = userId;

    runWithUserId(userId, () => next());
};
