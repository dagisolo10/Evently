import type { PaymentType } from "@/types/models/payment";

export interface AddPaymentPayload {
    amount: number;
    type: PaymentType;
    dueDate: string;
    eventId: string;
    description?: string | null;
    eventVendorId?: string | null;
}

export interface UpdatePaymentPayload {
    type: PaymentType;
    amount: number;
    dueDate: string;
    eventId: string;
    description?: string | null;
    eventVendorId?: string | null;
}
