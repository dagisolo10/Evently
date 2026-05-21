import type { Payment } from "./payment";
import type { GlobalVendor } from "./global-vendor";

export interface EventVendor {
    id: string;
    cost: number;
    deposit: number;
    dueDate: string;
    createdAt: string;
    eventId: string;
    globalVendorId: string;
}

export interface PopulatedEventVendor extends EventVendor {
    payments: Payment[];
    globalVendor: GlobalVendor;
    event?: import("./event").Event;
}
