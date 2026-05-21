"use client";

import { useCreateUser, useUpdateUser } from "@/hooks/use-user";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function UserSync() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { mutate: updateUserMutate } = useUpdateUser();
    const { mutate: createUserMutate } = useCreateUser();

    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;
        updateUserMutate({ name: user.fullName ?? "User" });
        createUserMutate({ name: user?.fullName ?? "User" });
    }, [createUserMutate, isLoaded, isSignedIn, updateUserMutate, user]);

    return null;
}
