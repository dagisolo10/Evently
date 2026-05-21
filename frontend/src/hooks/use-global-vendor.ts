"use client";

import type { ApiRequestError } from "@/lib/api/api-errors";
import { globalVendorApi } from "@/lib/api/routes/global-vendor";
import type { GlobalVendor } from "@/types/models/global-vendor";
import type { BulkArchiveGlobalVendorsPayload, CreateGlobalVendorPayload, UpdateGlobalVendorPayload } from "@/types/payloads/global-vendor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateGlobalVendor() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ globalVendor: GlobalVendor }, ApiRequestError, CreateGlobalVendorPayload>({
        mutationFn: (body) => globalVendorApi.create(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["globalVendors"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useUpdateGlobalVendor() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<
        { globalVendor: GlobalVendor },
        ApiRequestError,
        { id: string; body: UpdateGlobalVendorPayload }
    >({
        mutationFn: ({ id, body }) => globalVendorApi.update(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["globalVendors"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useArchiveGlobalVendor() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ globalVendor: GlobalVendor }, ApiRequestError, string>({
        mutationFn: (id) => globalVendorApi.archive(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["globalVendors"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useBulkArchiveGlobalVendors() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ count: number }, ApiRequestError, BulkArchiveGlobalVendorsPayload>({
        mutationFn: (body) => globalVendorApi.bulkArchive(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["globalVendors"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}
