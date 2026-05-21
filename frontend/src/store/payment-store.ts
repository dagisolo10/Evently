import type { Payment } from "@/types/models/payment";
import { create } from "zustand";

interface PaymentStore {
    payments: Payment[];
    loading: boolean;
}

const paymentStore = create<PaymentStore>(() => ({
    payments: [],
    loading: false,
}));

export default paymentStore;
