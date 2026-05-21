"use client";

import type { ApiRequestError } from "@/lib/api/api-errors";
import { eventApi } from "@/lib/api/routes/event";
import type { Event } from "@/types/models/event";
import type { CreateEventPayload, UpdateEventPayload } from "@/types/payloads/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateEvent() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ event: Event }, ApiRequestError, CreateEventPayload>({
        mutationFn: (body) => eventApi.create(body),
        onSuccess: (data) => {
            queryClient.setQueryData(["event", data.event.id], data.event);
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useUpdateEvent() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ event: Event }, ApiRequestError, { id: string; body: UpdateEventPayload }>({
        mutationFn: ({ id, body }) => eventApi.update(id, body),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["event", data.event.id] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useDeleteEvent() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ message: string }, ApiRequestError, string>({
        mutationFn: (id) => eventApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}
