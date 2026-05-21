"use client";

import type { ApiRequestError } from "@/lib/api/api-errors";
import { paymentApi } from "@/lib/api/routes/payment";
import type { Payment } from "@/types/models/payment";
import type { AddPaymentPayload, UpdatePaymentPayload } from "@/types/payloads/payment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddPayment() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ payment: Payment }, ApiRequestError, AddPaymentPayload>({
        mutationFn: (body) => paymentApi.add(body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["eventPayments", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["eventFinanceStats", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["payments"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useDeletePayment() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ payment: Payment }, ApiRequestError, string>({
        mutationFn: (id) => paymentApi.remove(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["eventPayments", data.payment.eventId] });
            queryClient.invalidateQueries({ queryKey: ["eventFinanceStats", data.payment.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["payments"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}

export function useUpdatePayment() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isPending, error } = useMutation<{ payment: Payment }, ApiRequestError, { id: string; body: UpdatePaymentPayload }>({
        mutationFn: ({ id, body }) => paymentApi.update(id, body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["eventPayments", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["eventFinanceStats", variables.body.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["payments"] });
        },
    });

    return { mutate, mutateAsync, isPending, error };
}
