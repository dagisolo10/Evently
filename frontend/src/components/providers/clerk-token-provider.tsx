"use client";

import { injectTokenResolver } from "@/lib/axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function ClerkTokenProvider({ children }: { children: React.ReactNode }) {
    const { getToken } = useAuth();

    useEffect(() => {
        injectTokenResolver(async () => {
            try {
                return await getToken();
            } catch (error) {
                console.error("Failed to fetch Clerk token for Axios:", error);
                return null;
            }
        });
    }, [getToken]);

    return <>{children}</>;
}
