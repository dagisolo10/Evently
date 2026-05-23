"use client";

import type { ApiRequestError } from "@/lib/api/api-errors";
import { userApi } from "@/lib/api/routes/user";
import { syncUserQueryOptions } from "@/lib/query-options";
import type { PopulatedUser } from "@/types/models/user";
import type { UpdateUserPayload } from "@/types/payloads/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetUser() {
    const { data: user, isFetching } = useQuery(syncUserQueryOptions());

    return { user, isFetching };
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
