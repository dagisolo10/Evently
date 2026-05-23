"use client";

import { useUpdateUser } from "@/hooks/use-user";
import { syncUserQueryOptions } from "@/lib/query-options";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";

export default function UserSync({ children }: { children: ReactNode }) {
    const { user, isLoaded, isSignedIn } = useUser();
    const { mutate: updateUserMutate } = useUpdateUser();

    const { data: dbUser } = useQuery(
        syncUserQueryOptions({
            enabled: isLoaded && isSignedIn,
        }),
    );

    useEffect(() => {
        if (dbUser && user?.fullName && dbUser.name !== user.fullName) {
            updateUserMutate({ name: user.fullName });
        }
    }, [dbUser, updateUserMutate, user?.fullName]);

    return children;
}
