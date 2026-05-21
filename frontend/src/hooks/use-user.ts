"use client";

import type { ApiRequestError } from "@/lib/api/api-errors";
import { userApi } from "@/lib/api/routes/user";
import { userQueryOptions } from "@/lib/query-options";
import type { PopulatedUser } from "@/types/models/user";
import type { CreateUserPayload, UpdateUserPayload } from "@/types/payloads/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetUser() {
    const { data: user, isFetching } = useQuery(userQueryOptions());

    return { user, isFetching };
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<PopulatedUser, ApiRequestError, CreateUserPayload>({
        mutationFn: (body) => userApi.createUser(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<PopulatedUser, ApiRequestError, UpdateUserPayload>({
        mutationFn: (body) => userApi.updateUser(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}
