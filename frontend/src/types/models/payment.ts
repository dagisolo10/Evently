export interface Payment {
    id: string;
    amount: number;
    type: PaymentType;
    dueDate: string;
    description: string | null;
    eventId: string;
    createdAt: string;
    eventVendorId: string | null;
    userId: string;
}

export type PaymentType = "Client" | "Vendor";