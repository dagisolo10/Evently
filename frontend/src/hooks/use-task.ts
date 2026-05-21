"use client";

import type { ApiRequestError } from "@/lib/api/api-errors";
import { taskApi } from "@/lib/api/routes/task";
import type { Task } from "@/types/models/task";
import type { CompleteTaskPayload, CreateTaskPayload, DeleteTaskQuery, UpdateTaskPayload } from "@/types/payloads/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ task: Task }, ApiRequestError, CreateTaskPayload>({
        mutationFn: (body) => taskApi.create(body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tasks", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["activeTasks", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useUpdateTask() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ task: Task }, ApiRequestError, { id: string; body: UpdateTaskPayload }>({
        mutationFn: ({ id, body }) => taskApi.update(id, body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tasks", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["activeTasks", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useCompleteTask() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ task: Task }, ApiRequestError, { id: string; body: CompleteTaskPayload }>({
        mutationFn: ({ id, body }) => taskApi.complete(id, body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tasks", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["activeTasks", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useDeleteTask() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ message: string }, ApiRequestError, { id: string; params: DeleteTaskQuery }>({
        mutationFn: ({ id, params }) => taskApi.remove(id, params),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tasks", variables.params.eventId] });
            queryClient.invalidateQueries({ queryKey: ["activeTasks", variables.params.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}
