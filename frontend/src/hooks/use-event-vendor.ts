"use client";

import type { ApiRequestError } from "@/lib/api/api-errors";
import { eventVendorApi } from "@/lib/api/routes/event-vendor";
import type { PopulatedEventVendor } from "@/types/models/event-vendor";
import type {
    BulkUnlinkVendorsPayload,
    LinkVendorToEventPayload,
    UnlinkVendorPayload,
    UpdateEventVendorPayload,
} from "@/types/payloads/event-vendor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBulkUnlinkEventVendors() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ message: string }, ApiRequestError, BulkUnlinkVendorsPayload>({
        mutationFn: (body) => eventVendorApi.bulkUnlink(body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["eventVendors", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["eventFinanceStats", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useLinkVendor() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ eventVendor: PopulatedEventVendor }, ApiRequestError, LinkVendorToEventPayload>({
        mutationFn: (body) => eventVendorApi.link(body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["eventVendors", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["eventFinanceStats", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useUnlinkEventVendor() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ message: string }, ApiRequestError, { id: string; body: UnlinkVendorPayload }>({
        mutationFn: ({ id, body }) => eventVendorApi.unlink(id, body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["eventVendors", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["eventFinanceStats", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useUpdateEventVendor() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<
        { eventVendor: PopulatedEventVendor },
        ApiRequestError,
        { id: string; body: UpdateEventVendorPayload }
    >({
        mutationFn: ({ id, body }) => eventVendorApi.update(id, body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["eventVendors", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["eventFinanceStats", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}
